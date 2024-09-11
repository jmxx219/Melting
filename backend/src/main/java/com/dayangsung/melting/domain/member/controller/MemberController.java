package com.dayangsung.melting.domain.member.controller;

import static com.dayangsung.melting.global.common.response.enums.ErrorMessage.*;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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

	@GetMapping("/nickname-check")
	public ApiResponse<?> nicknameCheck(@RequestParam String nickname) {
		if (!memberService.nicknameCheck(nickname)) {
			return ApiResponse.ok(null);
		} else {
			return ApiResponse.error(DUPLICATE_NICKNAME.getErrorMessage());
		}
	}

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
