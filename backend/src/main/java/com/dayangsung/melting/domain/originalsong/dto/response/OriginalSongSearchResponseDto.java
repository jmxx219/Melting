package com.dayangsung.melting.domain.originalsong.dto.response;

import com.dayangsung.melting.domain.originalsong.entity.OriginalSong;

import lombok.Builder;

@Builder
public record OriginalSongSearchResponseDto(
	Long originalSongId,
	String title,
	String artist,
	String coverImageUrl
) {
	public static OriginalSongSearchResponseDto of(OriginalSong originalSong) {
		return OriginalSongSearchResponseDto.builder()
			.originalSongId(originalSong.getId())
			.title(originalSong.getTitle())
			.artist(originalSong.getArtist())
			.coverImageUrl(originalSong.getCoverImageUrl())
			.build();
	}
}