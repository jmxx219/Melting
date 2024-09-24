package com.dayangsung.melting.domain.song.dto;

import com.dayangsung.melting.domain.song.enums.SongType;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

import lombok.Builder;

@Builder
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record MypageSongListDto(
	Long songId,
	String albumCoverImageUrl,
	SongType songType,
	int likeCount,
	boolean isLiked
) {

}
