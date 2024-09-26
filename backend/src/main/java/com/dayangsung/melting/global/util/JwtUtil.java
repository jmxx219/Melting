package com.dayangsung.melting.global.util;

import java.nio.charset.StandardCharsets;
import java.util.Date;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class JwtUtil {

	private static final long ACCESS_TOKEN_EXPIRE_TIME = 60 * 30 * 1000;
	private static final long REFRESH_TOKEN_EXPIRE_TIME = 60 * 60 * 24 * 1000;
	private final SecretKey secretKey;

	public JwtUtil(@Value("${spring.jwt.secret}") String secretKey,
		RedisUtil redisUtil) {
		this.secretKey = new SecretKeySpec(
			secretKey.getBytes(StandardCharsets.UTF_8),
			Jwts.SIG.HS256.key().build().getAlgorithm());
	}

	public String getEmail(String token) {
		return Jwts.parser()
			.verifyWith(secretKey)
			.build()
			.parseSignedClaims(token)
			.getPayload()
			.get("email", String.class);
	}

	public boolean validateToken(String token) {
		try {
			Claims claims = Jwts.parser()
				.verifyWith(secretKey)
				.build()
				.parseSignedClaims(token)
				.getPayload();

			return !claims.getExpiration().before(new Date());
		} catch (Exception e) {
			return false;
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

	public String createRefreshToken(String email) {
		return Jwts.builder()
			.claim("email", email)
			.issuedAt(new Date(System.currentTimeMillis()))
			.expiration(new Date(System.currentTimeMillis() + REFRESH_TOKEN_EXPIRE_TIME))
			.signWith(secretKey)
			.compact();
	}
}
