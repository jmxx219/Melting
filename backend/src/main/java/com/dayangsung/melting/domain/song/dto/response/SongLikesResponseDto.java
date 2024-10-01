package com.dayangsung.melting.domain.song.dto.response;

import com.dayangsung.melting.domain.song.entity.Song;

import lombok.Builder;

@Builder
public record SongLikesResponseDto(
	Long songId,
	String title,
	String albumCoverImageUrl,
	String creatorNickname,
	String artist,
	Boolean isLiked,
	Integer likedCount
) {
	// TODO:
	public static SongLikesResponseDto of(Song song, Boolean isLiked, Integer likedCount) {
		return SongLikesResponseDto.builder()
			.songId(song.getId())
			.title(song.getOriginalSong().getTitle())
			.creatorNickname(song.getMember().getNickname())
			.artist(song.getOriginalSong().getArtist())
			.isLiked(isLiked)
			.likedCount(likedCount)
			.build();
	}
}
