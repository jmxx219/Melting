package com.dayangsung.melting.global.util;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.concurrent.TimeUnit;

import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.stereotype.Component;

import com.dayangsung.melting.domain.album.entity.Album;
import com.dayangsung.melting.domain.album.repository.AlbumRepository;
import com.dayangsung.melting.global.common.enums.ErrorMessage;
import com.dayangsung.melting.global.exception.BusinessException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class RedisUtil {

	private final RedisTemplate<String, Object> redisTemplate;
	private final AlbumRepository albumRepository;
	private static final long ACCESS_TOKEN_EXPIRE_TIME = 30 * 60;
	private static final long REFRESH_TOKEN_EXPIRE_TIME = 60 * 60 * 24;
	private static final String DAILY_STREAMING_KEY = "album:streaming:daily";
	private static final String MONTHLY_STREAMING_KEY = "album:streaming:monthly";
	private static final String DAILY_ALBUM_KEY = "album:best:daily";
	private static final String MONTHLY_ALBUM_KEY = "album:best:monthly";

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

	public List<Album> getTop5AlbumLikes() {
		ZSetOperations<String, Object> zSetOperations = redisTemplate.opsForZSet();
		List<Album> topAlbums = new ArrayList<>();
		int offset = 0;
		while (topAlbums.size() < 5) {
			Set<ZSetOperations.TypedTuple<Object>> albumScores =
				zSetOperations.reverseRangeWithScores("album_likes", offset, offset + 4);
			if (albumScores == null || albumScores.isEmpty()) {
				throw new BusinessException(ErrorMessage.REDIS_SCORE_EMPTY);
			}
			for (ZSetOperations.TypedTuple<Object> albumScore : albumScores) {
				Album album = albumRepository.findById((Long)albumScore.getValue())
					.orElseThrow(() -> new BusinessException(ErrorMessage.ALBUM_NOT_FOUND));
				if (!album.getIsDeleted() && album.getIsPublic()) {
					topAlbums.add(album);
				}
				if (topAlbums.size() == 5) {
					break;
				}
			}
			offset += 5;
		}

		return topAlbums;
	}

	/**
	 *
	 * @param option true이면 일별 스트리밍 top5(hot5), false이면 월별 스트리밍 top5(n월의 앨범)
	 * @return 상위 5개 앨범 리스트
	 */
	public List<Album> getTop5AlbumsStreaming(Boolean option) {
		ListOperations<String, Object> listOperations = redisTemplate.opsForList();
		List<Album> hotAlbums = new ArrayList<>();
		String key;
		if (option) {
			key = DAILY_STREAMING_KEY;
		} else {
			key = MONTHLY_STREAMING_KEY;
		}
		int index = 0;
		while (hotAlbums.size() < 5) {
			Object albumIdObj = listOperations.index(key, index);
			if (albumIdObj == null) {
				break;
			}
			Album album = albumRepository.findById((Long) albumIdObj)
				.orElseThrow(() -> new BusinessException(ErrorMessage.ALBUM_NOT_FOUND));
			if (!album.getIsDeleted() && album.getIsPublic()) {
				hotAlbums.add(album);
			}
			index++;
		}
		if (hotAlbums.size() < 5) {
			throw new BusinessException(ErrorMessage.REDIS_SCORE_EMPTY);
		}

		return hotAlbums;
	}

	public void resetDailyStreamingCount() {
		log.debug("일별 스트리밍 횟수 초기화");
		storeRankingList(DAILY_STREAMING_KEY, DAILY_ALBUM_KEY);
		redisTemplate.delete(DAILY_STREAMING_KEY);
	}

	public void resetMonthlyStreamingCount() {
		log.debug("월별 스트리밍 횟수 초기화");
		storeRankingList(MONTHLY_STREAMING_KEY, MONTHLY_ALBUM_KEY);
		redisTemplate.delete(MONTHLY_STREAMING_KEY);
	}

	private void storeRankingList(String sortedSetKey, String listKey) {
		ZSetOperations<String, Object> zSetOperations = redisTemplate.opsForZSet();
		Set<Object> sortedSetValues = zSetOperations.range(sortedSetKey, 0, -1);
		if (sortedSetValues != null) {
			List<String> valueList = sortedSetValues.stream()
				.map(Object::toString)
				.toList();
			redisTemplate.opsForList().rightPushAll(listKey, valueList);
		}
	}
}
