package com.dayangsung.melting.domain.originalsong.dto.response;

import com.dayangsung.melting.domain.originalsong.entity.OriginalSong;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

import lombok.Builder;

@Builder
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record OriginalSongSearchResponseDto(
	String title,
	String artist,
	String coverImageUrl
) {
	public static OriginalSongSearchResponseDto of(OriginalSong originalSong) {
		return OriginalSongSearchResponseDto.builder()
			.title(originalSong.getTitle())
			.artist(originalSong.getArtist())
			.coverImageUrl(originalSong.getCoverImageUrl())
			.build();
	}
}