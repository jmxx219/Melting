package com.dayangsung.melting.domain.member.dto.response;

import com.dayangsung.melting.domain.member.entity.Member;

import lombok.Builder;

@Builder
public record MemberResponseDto(
	String nickname,
	String profileImageUrl
) {

	public static MemberResponseDto of(Member member) {
		return MemberResponseDto.builder()
			.nickname(member.getNickname())
			.profileImageUrl(member.getProfileImageUrl())
			.build();
	}
}
