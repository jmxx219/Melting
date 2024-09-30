package com.dayangsung.melting.domain.likes.service;

import java.util.Optional;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dayangsung.melting.domain.album.entity.Album;
import com.dayangsung.melting.domain.album.repository.AlbumRepository;
import com.dayangsung.melting.domain.likes.entity.LikesAlbum;
import com.dayangsung.melting.domain.likes.entity.LikesSong;
import com.dayangsung.melting.domain.likes.repository.LikesAlbumRepository;
import com.dayangsung.melting.domain.likes.repository.LikesSongRepository;
import com.dayangsung.melting.domain.member.repository.MemberRepository;
import com.dayangsung.melting.domain.song.repository.SongRepository;
import com.dayangsung.melting.global.common.enums.ErrorMessage;
import com.dayangsung.melting.global.exception.BusinessException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class LikesService {

	private final LikesAlbumRepository likesAlbumRepository;
	private final LikesSongRepository likesSongRepository;
	private final MemberRepository memberRepository;
	private final AlbumRepository albumRepository;
	private final SongRepository songRepository;
	private final RedisTemplate<String, Object> redisTemplate;

	public Integer getAlbumLikesCount(Long albumId) {
		Double albumLikesCount = redisTemplate.opsForZSet().score("album_likes", albumId);
		return albumLikesCount != null ? albumLikesCount.intValue() : 0;
	}

	@Transactional
	public Integer increaseAlbumLikes(Long albumId, Long memberId) {
		Album album = albumRepository.findById(albumId)
			.orElseThrow(() -> new BusinessException(ErrorMessage.ALBUM_NOT_FOUND));
		LikesAlbum likesAlbum = likesAlbumRepository
			.findLikesAlbumByAlbumIdAndMemberId(albumId, memberId).orElseGet(() ->
				LikesAlbum.builder()
					.album(albumRepository.findById(albumId)
						.orElseThrow(RuntimeException::new))
					.member(memberRepository.findById(memberId)
						.orElseThrow(RuntimeException::new))
					.build());
		if (!album.getLikesAlbums().contains(likesAlbum)) {
			album.addAlbumLikes(likesAlbum);
		}
		Double albumLikesCount = redisTemplate.opsForZSet().incrementScore("album_likes", albumId, 1);
		likesAlbum.updateStatus(true);
		likesAlbumRepository.save(likesAlbum);

		return albumLikesCount != null ? albumLikesCount.intValue() : 0;
	}

	@Transactional
	public Integer decreaseAlbumLikes(Long albumId, Long memberId) {
		LikesAlbum likesAlbum = likesAlbumRepository
			.findLikesAlbumByAlbumIdAndMemberId(albumId, memberId)
			.orElseThrow(RuntimeException::new);

		Double albumLikesCount = redisTemplate.opsForZSet().incrementScore("album_likes", albumId, -1);
		likesAlbum.updateStatus(false);
		likesAlbumRepository.save(likesAlbum);

		return albumLikesCount != null ? albumLikesCount.intValue() : 0;
	}

	public Integer getSongLikesCount(Long songId) {
		Double songLikesCount = redisTemplate.opsForZSet().score("song_likes", songId);
		return songLikesCount != null ? songLikesCount.intValue() : 0;
	}

	@Transactional
	public Integer increaseSongLikes(Long songId, Long memberId) {
		LikesSong likesSong = likesSongRepository
			.findLikesSongBySongIdAndMemberId(songId, memberId).orElseGet(() ->
				LikesSong.builder()
					.song(songRepository.findById(songId)
						.orElseThrow(RuntimeException::new))
					.member(memberRepository.findById(memberId)
						.orElseThrow(RuntimeException::new))
					.build());

		Double songLikesCount = redisTemplate.opsForZSet().incrementScore("song_likes", songId, 1);
		likesSong.updateStatus(true);
		likesSongRepository.save(likesSong);

		return songLikesCount != null ? songLikesCount.intValue() : 0;
	}

	@Transactional
	public Integer decreaseSongLikes(Long songId, Long memberId) {
		LikesSong likesSong = likesSongRepository
			.findLikesSongBySongIdAndMemberId(songId, memberId)
			.orElseThrow(RuntimeException::new);

		Double songLikesCount = redisTemplate.opsForZSet().incrementScore("song_likes", songId, -1);
		likesSong.updateStatus(false);
		likesSongRepository.save(likesSong);

		return songLikesCount != null ? songLikesCount.intValue() : 0;
	}

	public boolean isLikedBySongAndMember(Long songId, Long memberId) {
		Optional<LikesSong> likesSong = likesSongRepository.findLikesSongBySongIdAndMemberId(songId, memberId);
		return likesSong.isPresent() && likesSong.get().isStatus();
	}

	public void deleteAlbumLikesOnRedis(Long albumId) {
		redisTemplate.opsForZSet().remove("song_likes", albumId);
	}
}
