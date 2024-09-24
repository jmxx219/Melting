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
