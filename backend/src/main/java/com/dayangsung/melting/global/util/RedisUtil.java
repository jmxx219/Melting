package com.dayangsung.melting.global.util;

import java.time.Duration;
import java.util.concurrent.TimeUnit;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class RedisUtil {

	private final RedisTemplate<String, Object> redisTemplate;
	private static final long REFRESH_TOKEN_EXPIRE_TIME = 60 * 24 * 1000;

	public void saveRefreshToken(String accessToken, String refreshToken) {
		redisTemplate.opsForValue().set(accessToken, refreshToken, REFRESH_TOKEN_EXPIRE_TIME, TimeUnit.MILLISECONDS);
	}

	public String getRefreshToken(String accessToken) {
		return (String) redisTemplate.opsForValue().get(accessToken);
	}

	public void deleteRefreshToken(String accessToken) {
		redisTemplate.delete(accessToken);
	}
}
