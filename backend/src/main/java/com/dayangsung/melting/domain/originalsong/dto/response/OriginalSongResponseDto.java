package com.dayangsung.melting.domain.originalsong.dto.response;

import com.dayangsung.melting.domain.originalsong.entity.OriginalSong;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

import lombok.Builder;

@Builder
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record OriginalSongResponseDto(
	String title,
	String artist,
	String albumCoverUrl,
	String mrUrl,
	String lyrics
) {
	public static OriginalSongResponseDto of(OriginalSong originalSong) {
		return OriginalSongResponseDto.builder()
			.title(originalSong.getTitle())
			.artist(originalSong.getArtist())
			.albumCoverUrl(originalSong.getCoverImageUrl())
			.mrUrl(originalSong.getMrUrl())
			.lyrics(originalSong.getLyrics())
			.build();
	}
}
