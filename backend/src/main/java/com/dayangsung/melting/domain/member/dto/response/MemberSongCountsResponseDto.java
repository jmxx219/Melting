package com.dayangsung.melting.domain.member.dto.response;

import lombok.Builder;

@Builder
public record MemberSongCountsResponseDto(
	Integer songCounts,
	Boolean aiCoverEnabled
) {
	public static MemberSongCountsResponseDto of(Integer songCounts, Boolean aiCoverEnabled) {
		return MemberSongCountsResponseDto.builder()
			.songCounts(songCounts)
			.aiCoverEnabled(aiCoverEnabled)
			.build();
	}
}
