package com.dayangsung.melting.domain.member.controller;

import static com.dayangsung.melting.global.common.enums.ErrorMessage.*;

import java.util.List;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.dayangsung.melting.domain.auth.CustomOAuth2User;
import com.dayangsung.melting.domain.member.dto.request.MemberInitRequestDto;
import com.dayangsung.melting.domain.member.dto.request.MemberUpdateRequestDto;
import com.dayangsung.melting.domain.member.dto.response.MemberResponseDto;
import com.dayangsung.melting.domain.member.dto.response.MemberSongResponseDto;
import com.dayangsung.melting.domain.member.enums.Gender;
import com.dayangsung.melting.domain.member.service.MemberService;
import com.dayangsung.melting.global.common.response.ApiResponse;

import io.swagger.v3.oas.annotations.Operation;
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
		@RequestPart(required = false) MultipartFile multipartFile,
		@RequestPart MemberInitRequestDto memberInitRequestDto) {
		log.debug("member service nickname {}", memberInitRequestDto.nickname());
		MemberResponseDto memberResponseDto =
			memberService.initMemberInfo(multipartFile,
				memberInitRequestDto.nickname(),
				Gender.valueOf(memberInitRequestDto.gender().toUpperCase()),
				"ssafy@ssafy.com");
		return ApiResponse.ok(memberResponseDto);
	}

	@PatchMapping
	public ApiResponse<MemberResponseDto> updateMemberInfo(
		@RequestPart(required = false) MultipartFile multipartFile,
		@RequestPart MemberUpdateRequestDto memberUpdateRequestDto,
		@AuthenticationPrincipal CustomOAuth2User customOAuth2User) {
		if (multipartFile.isEmpty() && memberUpdateRequestDto.nickname() == null) {
			return ApiResponse.error(MEMBER_BAD_REQUEST.getErrorMessage());
		}
		MemberResponseDto memberResponseDto = memberService.updateMemberInfo(
			multipartFile,
			memberUpdateRequestDto.nickname(),
			customOAuth2User.getName());
		return ApiResponse.ok(memberResponseDto);
	}

	@GetMapping("/logout")
	public ApiResponse<Void> logout(HttpServletRequest request, HttpServletResponse response) {
		memberService.logout(request, response);
		return ApiResponse.ok(null);
	}

	@Operation(summary = "사용자가 생성한 곡 목록")
	@GetMapping("/me/songs")
	public ApiResponse<MemberSongResponseDto> getMemberSongs(
		@AuthenticationPrincipal CustomOAuth2User customOAuth2User) {
		MemberSongResponseDto memberSongResponseDto = memberService.getMemberSongs(customOAuth2User.getId());
		return ApiResponse.ok(memberSongResponseDto);
	}

	@GetMapping("/me/hashtags")
	public ApiResponse<List<String>> getMemberHashtags(
		@AuthenticationPrincipal CustomOAuth2User customOAuth2User) {
		List<String> memberHashtags = memberService.getMemberHashtags(customOAuth2User.getName());
		return ApiResponse.ok(memberHashtags);
	}

	@PostMapping("/me/hashtags")
	public ApiResponse<List<String>> addMemberHashtag(
		@RequestParam String content,
		@AuthenticationPrincipal CustomOAuth2User customOAuth2User) {
		List<String> memberHashtags =
			memberService.addMemberHashtags(customOAuth2User.getName(), content);
		return ApiResponse.ok(memberHashtags);
	}

	@DeleteMapping("/me/hashtags")
	public ApiResponse<List<String>> deleteMemberHashtag(
		@RequestParam String content,
		@AuthenticationPrincipal CustomOAuth2User customOAuth2User) {
		List<String> memberHashtags =
			memberService.deleteMemberHashtags(customOAuth2User.getName(), content);
		return ApiResponse.ok(memberHashtags);
	}
}
