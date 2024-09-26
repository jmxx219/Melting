package com.dayangsung.melting.domain.song.service;

// import org.springframework.data.redis.core.RedisTemplate;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import com.dayangsung.melting.domain.likes.service.LikesService;
import com.dayangsung.melting.domain.song.dto.response.SongDetailsResponseDto;
import com.dayangsung.melting.domain.song.entity.Song;
import com.dayangsung.melting.domain.song.repository.SongRepository;
import com.dayangsung.melting.global.common.service.AwsS3Service;
import com.dayangsung.melting.global.redisson.DistributedLock;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class SongService {

	private final SongRepository songRepository;
	private final AwsS3Service awsS3Service;
	private final LikesService likesService;
	private final RedisTemplate<String, Object> redisTemplate;

	private static final String STREAMING_COUNT_KEY = "song:streaming:counts";

	public SongDetailsResponseDto getSongDetails(Long songId) {
		Song song = songRepository.findById(songId).orElseThrow(RuntimeException::new);
		String albumCoverImage = awsS3Service.getDefaultSongCoverImageUrl();
		if (song.getAlbum() != null) {
			albumCoverImage = song.getAlbum().getAlbumCoverImage();
		}
		incrementStreamingCount(songId);
		return SongDetailsResponseDto.of(song, albumCoverImage, likesService.getSongLikesCount(songId));

	}

	// Todo : 트랜잭션 적용 필요
	@DistributedLock(value = "#songId")
	public void incrementStreamingCount(Long songId) {
		String key = STREAMING_COUNT_KEY;
		Double streamingCount = redisTemplate.opsForZSet().incrementScore(key, songId.toString(), 1);
		log.info("Incremented streaming count for song {}: {}", songId, streamingCount);
	}
}
