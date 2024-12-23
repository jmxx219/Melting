package com.dayangsung.melting.domain.song.dto;

import java.time.LocalDateTime;

import com.dayangsung.melting.domain.song.enums.SongType;

import lombok.Builder;

@Builder
public record SongMypageDto(
	Long songId,
	String albumCoverImageUrl,
	SongType songType,
	int likeCount,
	boolean isLiked,
	boolean isCreated,
	LocalDateTime lastModifiedAt

) {
}
