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

import io.jsonwebtoken.Jwts;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class JwtUtil {

	private static final long ACCESS_TOKEN_EXPIRE_TIME = 60 * 30;
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
		return Jwts.parser()
			.verifyWith(secretKey)
			.build()
			.parseSignedClaims(token)
			.getPayload()
			.getExpiration()
			.before(new Date());
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
			cookieUtil.deleteJwtCookies(request);
			return null;
		}

		String accessToken = createAccessToken(redisToken.getEmail());
		redisRepository.save(RedisToken.builder()
			.email(redisToken.getEmail())
			.refreshToken(createRefreshToken(redisToken.getEmail()))
			.build());
		cookieUtil.updateCookie(request, response, "access_token", accessToken);
		cookieUtil.updateCookie(request, response, "refresh_token", refreshToken);

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

	public boolean isValidate(String token) {
		try {
			Jwts.parser()
				.verifyWith(secretKey)
				.build()
				.parseSignedClaims(token);

			return true;
		} catch (Exception e) {
			return false;
		}
	}
}
