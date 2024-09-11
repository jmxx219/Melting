package com.dayangsung.melting.domain.member.dto.response;

import com.dayangsung.melting.domain.member.entity.Member;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

import lombok.Builder;

@Builder
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record MemberInitResponseDto (
	String nickname
) {

	public static MemberInitResponseDto of(Member member) {
		return MemberInitResponseDto.builder()
			.nickname(member.getNickname())
			.build();
	}
}
