package com.dayangsung.melting.domain.member.controller;

import static com.dayangsung.melting.global.common.response.enums.ErrorMessage.*;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.dayangsung.melting.domain.auth.CustomOAuth2User;
import com.dayangsung.melting.domain.member.dto.request.MemberInitRequestDto;
import com.dayangsung.melting.domain.member.dto.request.MemberUpdateRequestDto;
import com.dayangsung.melting.domain.member.dto.response.MemberResponseDto;
import com.dayangsung.melting.domain.member.enums.Gender;
import com.dayangsung.melting.domain.member.service.MemberService;
import com.dayangsung.melting.global.common.response.ApiResponse;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/v1/members")
@RequiredArgsConstructor
public class MemberController {

	private final MemberService memberService;

	@GetMapping
	public ApiResponse<MemberResponseDto> getMemberInfo(
		@AuthenticationPrincipal CustomOAuth2User customOAuth2User) {
		MemberResponseDto memberResponseDto = memberService.getMemberInfo(customOAuth2User.getName());
		return ApiResponse.ok(memberResponseDto);
	}

	@GetMapping("/nickname-check")
	public ApiResponse<Boolean> validateNickname(@RequestParam String nickname) {
		return ApiResponse.ok(memberService.validateNickname(nickname));
	}

	@PatchMapping("/init")
	public ApiResponse<MemberResponseDto> initMemberInfo(
		@RequestPart MultipartFile multipartFile,
		@RequestPart MemberInitRequestDto memberInitRequestDto,
		@AuthenticationPrincipal CustomOAuth2User customOAuth2User) {
		MemberResponseDto memberResponseDto =
			memberService.initMemberInfo(multipartFile,
				memberInitRequestDto.nickName(),
				Gender.valueOf(memberInitRequestDto.gender().toUpperCase()),
				customOAuth2User.getName());
		return ApiResponse.ok(memberResponseDto);
	}

	@PatchMapping
	public ApiResponse<MemberResponseDto> updateMemberInfo(
		@RequestPart MultipartFile multipartFile,
		@RequestPart MemberUpdateRequestDto memberUpdateRequestDto,
		@AuthenticationPrincipal CustomOAuth2User customOAuth2User) {
		if (multipartFile.isEmpty() && memberUpdateRequestDto.nickName().isEmpty()) {
			return ApiResponse.error(MEMBER_BAD_REQUEST.getErrorMessage());
		}
		MemberResponseDto memberResponseDto = memberService.updateMemberInfo(
			multipartFile,
			memberUpdateRequestDto.nickName(),
			customOAuth2User.getName());
		return ApiResponse.ok(memberResponseDto);
	}

	@GetMapping("/logout")
	public ApiResponse<Void> logout(HttpServletRequest request, HttpServletResponse response) {
		memberService.logout(request, response);
		return ApiResponse.ok(null);
	}
}
