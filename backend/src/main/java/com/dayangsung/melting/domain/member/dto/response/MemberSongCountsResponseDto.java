package com.dayangsung.melting.domain.member.dto.response;

import lombok.Builder;

@Builder
public record MemberSongCountsResponseDto(
	Integer songcounts
) {
}
