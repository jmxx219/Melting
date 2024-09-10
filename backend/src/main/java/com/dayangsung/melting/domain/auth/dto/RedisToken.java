package com.dayangsung.melting.domain.auth.dto;

import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@RedisHash(value = "refreshToken", timeToLive = 86400)
public class RedisToken {

	@Id
	private String refreshToken;
	private String email;
}
