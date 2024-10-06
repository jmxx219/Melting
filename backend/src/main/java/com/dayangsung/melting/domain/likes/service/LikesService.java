package com.dayangsung.melting.domain.likes.service;

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
import com.dayangsung.melting.domain.song.entity.Song;
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
					.album(album)
					.member(memberRepository.findById(memberId)
						.orElseThrow(() -> new BusinessException(ErrorMessage.MEMBER_NOT_FOUND)))
					.build());
		if (likesAlbum.isLiked()) {
			throw new BusinessException(ErrorMessage.ALBUM_ALREADY_LIKED);
		}
		likesAlbum.updateIsLiked(true);
		if (!album.getLikesAlbums().contains(likesAlbum)) {
			album.addAlbumLikes(likesAlbum);
		}
		Double albumLikesCount = redisTemplate.opsForZSet().incrementScore("album_likes", albumId, 1);
		likesAlbumRepository.save(likesAlbum);

		return albumLikesCount != null ? albumLikesCount.intValue() : 0;
	}

	@Transactional
	public Integer decreaseAlbumLikes(Long albumId, Long memberId) {
		LikesAlbum likesAlbum = likesAlbumRepository
			.findLikesAlbumByAlbumIdAndMemberId(albumId, memberId)
			.orElseThrow(() -> new BusinessException(ErrorMessage.ALBUM_LIKES_NOT_FOUND));

		Double albumLikesCount = redisTemplate.opsForZSet().score("album_likes", albumId);
		if (albumLikesCount == null || albumLikesCount <= 0) {
			throw new BusinessException(ErrorMessage.LIKES_CANNOT_BE_NEGATIVE);
		}
		albumLikesCount = redisTemplate.opsForZSet().incrementScore("album_likes", albumId, -1);
		likesAlbum.updateIsLiked(false);
		likesAlbumRepository.save(likesAlbum);

		return albumLikesCount != null ? albumLikesCount.intValue() : 0;
	}

	public Integer getSongLikesCount(Long songId) {
		Double songLikesCount = redisTemplate.opsForZSet().score("song_likes", songId);
		return songLikesCount != null ? songLikesCount.intValue() : 0;
	}

	@Transactional
	public Integer increaseSongLikes(Long songId, Long memberId) {
		Song song = songRepository.findById(songId)
			.orElseThrow(() -> new BusinessException(ErrorMessage.SONG_NOT_FOUND));
		LikesSong likesSong = likesSongRepository
			.findLikesSongBySongIdAndMemberId(songId, memberId).orElseGet(() ->
				LikesSong.builder()
					.song(song)
					.member(memberRepository.findById(memberId)
						.orElseThrow(() -> new BusinessException(ErrorMessage.MEMBER_NOT_FOUND)))
					.build());
		if (likesSong.isLiked()) {
			throw new BusinessException(ErrorMessage.SONG_ALREADY_LIKED);
		}
		likesSong.updateIsLiked(true);
		if (!song.getLikesSongs().contains(likesSong)) {
			song.addSongLikes(likesSong);
		}
		Double songLikesCount = redisTemplate.opsForZSet().incrementScore("song_likes", songId, 1);
		likesSongRepository.save(likesSong);

		return songLikesCount != null ? songLikesCount.intValue() : 0;
	}

	@Transactional
	public Integer decreaseSongLikes(Long songId, Long memberId) {
		LikesSong likesSong = likesSongRepository
			.findLikesSongBySongIdAndMemberId(songId, memberId)
			.orElseThrow(() -> new BusinessException(ErrorMessage.SONG_LIKES_NOT_FOUND));

		Double songLikesCount = redisTemplate.opsForZSet().score("song_likes", songId);
		if (songLikesCount == null || songLikesCount <= 0) {
			throw new BusinessException(ErrorMessage.LIKES_CANNOT_BE_NEGATIVE);
		}
		songLikesCount = redisTemplate.opsForZSet().incrementScore("song_likes", songId, -1);
		likesSong.updateIsLiked(false);
		likesSongRepository.save(likesSong);

		return songLikesCount != null ? songLikesCount.intValue() : 0;
	}

	public Boolean isLikedBySongAndMember(Long songId, Long memberId) {
		return likesSongRepository.existsByMemberIdAndSongIdAndStatusTrue(memberId, songId);
	}

	public Boolean isLikedByAlbumAndMember(Long albumId, Long memberId) {
		return likesAlbumRepository.existsByMemberIdAndAlbumIdAndStatusTrue(memberId, albumId);
	}

	@Transactional
	public void deleteAlbumLikesOnRedis(Long albumId) {
		redisTemplate.opsForZSet().remove("song_likes", albumId);
	}
}
