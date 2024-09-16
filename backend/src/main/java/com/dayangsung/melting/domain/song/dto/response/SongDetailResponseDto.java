package com.dayangsung.melting.domain.song.dto.response;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

import lombok.Builder;

@Builder
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record SongDetailResponseDto(
	Long songId,
	String songTitle,
	String nickname,
	String artist,
	String albumImageUrl,
	Long likedCount,
	String songUrl
) {
}
