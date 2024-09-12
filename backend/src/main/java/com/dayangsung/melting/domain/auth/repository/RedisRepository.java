package com.dayangsung.melting.domain.auth.repository;

import org.springframework.data.repository.CrudRepository;

import com.dayangsung.melting.domain.auth.dto.RedisToken;

public interface RedisRepository extends CrudRepository<RedisToken, Long> {
	RedisToken findRedisTokenByRefreshToken(String refreshToken);

	void deleteRedisTokenByRefreshToken(String refreshToken);
}
