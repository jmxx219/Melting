package com.dayangsung.melting.domain.member.dto.response;

import com.dayangsung.melting.domain.member.entity.Member;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

import lombok.Builder;

@Builder
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record MemberResponseDto(
	String nickname,
	String profileImageUrl
) {

	public static MemberResponseDto of(Member member) {
		return MemberResponseDto.builder()
			.nickname(member.getNickname())
			.profileImageUrl(member.getProfileImage())
			.build();
	}
}
