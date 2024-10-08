package com.dayangsung.melting.global.common.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Set;

import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.stereotype.Service;

import com.dayangsung.melting.domain.album.entity.Album;
import com.dayangsung.melting.domain.album.repository.AlbumRepository;
import com.dayangsung.melting.global.common.enums.ErrorMessage;
import com.dayangsung.melting.global.exception.BusinessException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class RedisService {

	private final RedisTemplate<String, Object> redisTemplate;
	private static final String DAILY_STREAMING_KEY = "album:streaming:daily";
	private static final String MONTHLY_STREAMING_KEY = "album:streaming:monthly";
	private static final String DAILY_ALBUM_KEY = "album:best:daily";
	private static final String MONTHLY_ALBUM_KEY = "album:best:monthly";
	private final AlbumRepository albumRepository;

	public List<Album> getTop5AlbumLikes() {
		ZSetOperations<String, Object> zSetOperations = redisTemplate.opsForZSet();
		List<Album> topAlbums = new ArrayList<>();
		int offset = 0;
		while (topAlbums.size() < 5) {
			Set<ZSetOperations.TypedTuple<Object>> albumScores =
				zSetOperations.reverseRangeWithScores("album_likes", offset, offset + 4);
			if (albumScores == null || albumScores.isEmpty()) {
				break;
			}
			for (ZSetOperations.TypedTuple<Object> albumScore : albumScores) {
				Album album = albumRepository.findById(
						Long.parseLong(Objects.requireNonNull(albumScore.getValue()).toString()))
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
			key = DAILY_ALBUM_KEY;
		} else {
			key = MONTHLY_ALBUM_KEY;
		}
		int index = 0;
		while (hotAlbums.size() < 5) {
			Object albumIdObj = listOperations.index(key, index);
			if (albumIdObj == null) {
				break;
			}
			Long albumId = Long.parseLong(albumIdObj.toString());
			log.debug("index: {}, albumId: {}", index, albumId);
			Album album = albumRepository.findById(albumId)
				.orElseThrow(() -> new BusinessException(ErrorMessage.ALBUM_NOT_FOUND));
			if (!album.getIsDeleted() && album.getIsPublic()) {
				hotAlbums.add(album);
			}
			index++;
		}
		log.debug("key: {}, hotAlbums: {}", key, hotAlbums);
		return hotAlbums;
	}

	private void storeRankingList(String sortedSetKey, String listKey) {
		ZSetOperations<String, Object> zSetOperations = redisTemplate.opsForZSet();
		int offset = 0;
		int count = 0;
		while (count < 5) {
			Set<ZSetOperations.TypedTuple<Object>> albumScores =
				zSetOperations.reverseRangeWithScores(sortedSetKey, offset, offset + 4);
			if (albumScores == null || albumScores.isEmpty()) {
				break;
			}
			for (ZSetOperations.TypedTuple<Object> albumScore : albumScores) {
				Album album = albumRepository.findById(
						Long.parseLong(Objects.requireNonNull(albumScore.getValue()).toString()))
					.orElseThrow(() -> new BusinessException(ErrorMessage.ALBUM_NOT_FOUND));
				if (!album.getIsDeleted() && album.getIsPublic()) {
					redisTemplate.opsForList().rightPush(listKey, album.getId());
					count++;
				}
				if (count == 5) {
					break;
				}
			}
			offset += 5;
		}
	}

	public void resetDailyStreamingCount() {
		log.debug("일별 스트리밍 횟수 초기화");
		redisTemplate.delete(DAILY_ALBUM_KEY);
		storeRankingList(DAILY_STREAMING_KEY, DAILY_ALBUM_KEY);
		redisTemplate.delete(DAILY_STREAMING_KEY);
	}

	public void resetMonthlyStreamingCount() {
		log.debug("월별 스트리밍 횟수 초기화");
		redisTemplate.delete(MONTHLY_ALBUM_KEY);
		storeRankingList(MONTHLY_STREAMING_KEY, MONTHLY_ALBUM_KEY);
		redisTemplate.delete(MONTHLY_STREAMING_KEY);
	}
}
