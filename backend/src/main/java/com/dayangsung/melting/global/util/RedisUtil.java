package com.dayangsung.melting.global.util;

import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.stereotype.Component;

import com.dayangsung.melting.domain.album.entity.Album;
import com.dayangsung.melting.domain.album.repository.AlbumRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class RedisUtil {

	private final RedisTemplate<String, Object> redisTemplate;
	private final AlbumRepository albumRepository;
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
		return (String) redisTemplate.opsForValue().get(key);
	}

	public String getRefreshToken(String email) {
		String key = email + ":refresh";
		return (String) redisTemplate.opsForValue().get(key);
	}

	public void deleteAccessToken(String email) {
		String key = email + ":access";
		redisTemplate.delete(key);
	}

	public void deleteRefreshToken(String email) {
		String key = email + ":refresh";
		redisTemplate.delete(key);
	}

	public List<Album> getTop5AlbumLikes() {
		ZSetOperations<String, Object> zSetOperations = redisTemplate.opsForZSet();
		Set<ZSetOperations.TypedTuple<Object>> top5Albums = zSetOperations.reverseRangeWithScores("album_likes", 0, 4);

		if (top5Albums != null) {
			return top5Albums.stream()
				.map(ZSetOperations.TypedTuple::getValue)
				.map(String::valueOf)
				.map(albumId -> albumRepository.findById(Long.valueOf(albumId))
					.orElseThrow(RuntimeException::new))
				.filter(Objects::nonNull)
				.collect(Collectors.toList());
		}
		return List.of();
	}
}
