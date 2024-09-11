package com.dayangsung.melting.domain.member.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dayangsung.melting.domain.auth.dto.CustomOAuth2User;
import com.dayangsung.melting.domain.member.dto.request.MemberInitRequestDto;
import com.dayangsung.melting.domain.member.dto.response.MemberInitResponseDto;
import com.dayangsung.melting.domain.member.enums.Gender;
import com.dayangsung.melting.domain.member.service.MemberService;
import com.dayangsung.melting.global.common.response.ApiResponse;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/v1/members")
@RequiredArgsConstructor
public class MemberController {

	private final MemberService memberService;

	@PatchMapping("/init")
	public ApiResponse<MemberInitResponseDto> init(
		@RequestBody MemberInitRequestDto memberInitRequestDto,
		@AuthenticationPrincipal CustomOAuth2User customOAuth2User) {
		MemberInitResponseDto memberResponseDto =
			memberService.init(memberInitRequestDto.profileImageFileName(),
				memberInitRequestDto.nickName(),
				Gender.valueOf(memberInitRequestDto.gender()),
				customOAuth2User);
		return ApiResponse.ok(memberResponseDto);
	}
}
