package com.dayangsung.melting.domain.member.dto;

import lombok.Builder;

@Builder
public record MemberModelResultDto(
	String memberId
) {
}
