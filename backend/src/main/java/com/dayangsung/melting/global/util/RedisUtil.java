package com.dayangsung.melting.global.util;

import java.util.concurrent.TimeUnit;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class RedisUtil {

	private final RedisTemplate<String, Object> redisTemplate;
	private static final long ACCESS_TOKEN_EXPIRE_TIME = 30 * 60;
	private static final long REFRESH_TOKEN_EXPIRE_TIME = 60 * 60 * 24;

	public void saveAccessToken(String email, String accessToken) {
		String key = email + ":access";
		redisTemplate.opsForValue().set(key, accessToken, ACCESS_TOKEN_EXPIRE_TIME, TimeUnit.SECONDS);
	}

	public void saveRefreshToken(String email, String refreshToken) {
		String key = email + ":refresh";
		redisTemplate.opsForValue().set(key, refreshToken, REFRESH_TOKEN_EXPIRE_TIME, TimeUnit.SECONDS);
	}

	public String getAccessToken(String email) {
		String key = email + ":access";
		return (String)redisTemplate.opsForValue().get(key);
	}

	public String getRefreshToken(String email) {
		String key = email + ":refresh";
		return (String)redisTemplate.opsForValue().get(key);
	}

	public void deleteAccessToken(String email) {
		String key = email + ":access";
		redisTemplate.delete(key);
	}

	public void deleteRefreshToken(String email) {
		String key = email + ":refresh";
		redisTemplate.delete(key);
	}
}
