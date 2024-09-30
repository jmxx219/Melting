package com.dayangsung.melting.domain.originalsong.dto.response;

import com.dayangsung.melting.domain.originalsong.entity.OriginalSong;

import lombok.Builder;

@Builder
public record OriginalSongResponseDto(
	Long originalSongId,
	String title,
	String artist,
	String albumCoverUrl,
	String mrUrl,
	String lyrics
) {
	public static OriginalSongResponseDto of(OriginalSong originalSong) {
		return OriginalSongResponseDto.builder()
			.originalSongId(originalSong.getId())
			.title(originalSong.getTitle())
			.artist(originalSong.getArtist())
			.albumCoverUrl(originalSong.getCoverImageUrl())
			.mrUrl(originalSong.getMrUrl())
			.lyrics(originalSong.getLyrics())
			.build();
	}
}
