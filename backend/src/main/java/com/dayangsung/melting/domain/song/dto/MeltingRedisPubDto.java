package com.dayangsung.melting.domain.song.dto;

import lombok.Builder;

@Builder
public record MeltingRedisPubDto(
	String userVoiceUrl,
	String mrUrl,
	Long memberId,
	Long songId,
	boolean endpoint) {
}
