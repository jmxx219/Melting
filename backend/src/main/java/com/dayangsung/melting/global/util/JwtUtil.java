package com.dayangsung.melting.global.util;

import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.UUID;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.dayangsung.melting.domain.auth.dto.RedisToken;
import com.dayangsung.melting.domain.auth.repository.RedisRepository;
import com.dayangsung.melting.domain.auth.service.AuthService;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.SignatureException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class JwtUtil {

	private static final long ACCESS_TOKEN_EXPIRE_TIME = 60 * 30 * 1000;
	private final SecretKey secretKey;
	private final RedisRepository redisRepository;
	private final AuthService authService;
	private final CookieUtil cookieUtil;

	public JwtUtil(@Value("${spring.jwt.secret}") String secretKey,
		RedisRepository redisRepository,
		AuthService authService, CookieUtil cookieUtil) {
		this.secretKey = new SecretKeySpec(
			secretKey.getBytes(StandardCharsets.UTF_8),
			Jwts.SIG.HS256.key().build().getAlgorithm());
		this.redisRepository = redisRepository;
		this.authService = authService;
		this.cookieUtil = cookieUtil;
	}

	public String getEmail(String token) {
		return Jwts.parser()
			.verifyWith(secretKey)
			.build()
			.parseSignedClaims(token)
			.getPayload()
			.get("email", String.class);
	}

	public Boolean isExpired(String token) {
		try {
			Claims claims = Jwts.parser()
				.verifyWith(secretKey)
				.build()
				.parseSignedClaims(token)
				.getPayload();

			Date expiration = claims.getExpiration();
			return expiration.before(new Date());
		} catch (ExpiredJwtException e) {
			return true;
		}
	}

	public String createAccessToken(String email) {
		return Jwts.builder()
			.claim("email", email)
			.issuedAt(new Date(System.currentTimeMillis()))
			.expiration(new Date(System.currentTimeMillis() + ACCESS_TOKEN_EXPIRE_TIME))
			.signWith(secretKey)
			.compact();
	}

	public String reissueToken(HttpServletRequest request, HttpServletResponse response, String refreshToken) {
		RedisToken redisToken = redisRepository.findRedisTokenByRefreshToken(refreshToken);

		if (redisToken == null) {
			cookieUtil.deleteJwtCookies(request, response);
			return null;
		}

		String accessToken = createAccessToken(redisToken.getEmail());
		redisRepository.deleteRedisTokenByRefreshToken(redisToken.getRefreshToken());
		redisRepository.save(RedisToken.builder()
			.email(redisToken.getEmail())
			.refreshToken(createRefreshToken(redisToken.getEmail()))
			.build());
		response.addCookie(cookieUtil.createCookie("access_token", accessToken));
		response.addCookie(cookieUtil.createCookie("refresh_token", refreshToken));

		return accessToken;
	}

	public String createRefreshToken(String email) {
		String refreshToken = UUID.randomUUID().toString();

		redisRepository.save(RedisToken.builder()
			.refreshToken(refreshToken)
			.email(email)
			.build());
		
		return refreshToken;
	}

	public boolean signatureValidate(String token) {
		try {
			Jwts.parser()
				.verifyWith(secretKey)
				.build()
				.parseSignedClaims(token);
			return true;
		} catch (SignatureException e) {
			return false;
		} catch (Exception e) {
			return true;
		}
	}
}
