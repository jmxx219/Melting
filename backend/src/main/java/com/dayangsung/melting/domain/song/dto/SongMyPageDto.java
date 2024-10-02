package com.dayangsung.melting.domain.song.dto;

import com.dayangsung.melting.domain.song.enums.SongType;

import lombok.Builder;

@Builder
public record SongMyPageDto(
	Long songId,
	String albumCoverImageUrl,
	SongType songType,
	int likeCount,
	boolean isLiked
) {
}
