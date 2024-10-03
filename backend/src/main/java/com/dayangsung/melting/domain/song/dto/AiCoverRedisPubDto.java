package com.dayangsung.melting.domain.song.dto;

import lombok.Builder;

@Builder
public record AiCoverRedisPubDto(
	Long memberId,
	Long songId,
	String originalSongMrUrl,
	String originalSongVoiceUrl,
	String memberGender,
	String originalVoiceGender
) {
}
