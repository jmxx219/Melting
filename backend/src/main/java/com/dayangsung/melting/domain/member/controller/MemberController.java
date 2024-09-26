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

import com.dayangsung.melting.domain.album.service.AlbumService;
import com.dayangsung.melting.domain.auth.dto.CustomOAuth2User;
import com.dayangsung.melting.domain.member.dto.request.MemberInitRequestDto;
import com.dayangsung.melting.domain.member.dto.request.MemberUpdateRequestDto;
import com.dayangsung.melting.domain.member.dto.response.MemberAlbumResponseDto;
import com.dayangsung.melting.domain.member.dto.response.MemberResponseDto;
import com.dayangsung.melting.domain.member.enums.Gender;
import com.dayangsung.melting.domain.member.repository.MemberRepository;
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
	private final MemberRepository memberRepository;
	private final AlbumService albumService;

	@GetMapping
	public ApiResponse<MemberResponseDto> getMemberInfo(
			@AuthenticationPrincipal CustomOAuth2User customOAuth2User) {
		MemberResponseDto memberResponseDto = memberService.getMemberInfo(customOAuth2User.getId());
		return ApiResponse.ok(memberResponseDto);
	}

	@GetMapping("/nickname-check")
	public ApiResponse<Void> validateNickname(@RequestParam String nickname) {
		if (memberService.validateNickname(nickname)) {
			return ApiResponse.ok(null);
		} else {
			return ApiResponse.error(DUPLICATE_NICKNAME.getErrorMessage());
		}
	}

	@PatchMapping("/init")
	public ApiResponse<MemberResponseDto> initMemberInfo(
			@RequestPart MultipartFile multipartFile,
			@RequestBody MemberInitRequestDto memberInitRequestDto,
			@AuthenticationPrincipal CustomOAuth2User customOAuth2User) {
		MemberResponseDto memberResponseDto =
				memberService.initMemberInfo(multipartFile,
						memberInitRequestDto.nickName(),
						Gender.valueOf(memberInitRequestDto.gender()),
						customOAuth2User.getId());
		return ApiResponse.ok(memberResponseDto);
	}

	@PatchMapping
	public ApiResponse<MemberResponseDto> updateMemberInfo(
			@RequestPart MultipartFile multipartFile,
			@RequestBody MemberUpdateRequestDto memberUpdateRequestDto,
			@AuthenticationPrincipal CustomOAuth2User customOAuth2User) {
		if (multipartFile.isEmpty() && memberUpdateRequestDto.nickName().isEmpty()) {
			return ApiResponse.error(MEMBER_BAD_REQUEST.getErrorMessage());
		}
		MemberResponseDto memberResponseDto = memberService.updateMemberInfo(
				multipartFile,
				memberUpdateRequestDto.nickName(),
				customOAuth2User.getId());
		return ApiResponse.ok(memberResponseDto);
	}

	@GetMapping("/logout")
	public ApiResponse<Void> logout(HttpServletRequest request, HttpServletResponse response) {
		memberService.logout(request, response);
		return ApiResponse.ok(null);
	}

	@GetMapping("{memberId}/me/albums")
	public ApiResponse<MemberAlbumResponseDto> getMemberAlbums(
			@AuthenticationPrincipal CustomOAuth2User customOAuth2User) {
		Long memberId = customOAuth2User.getId();
		MemberAlbumResponseDto memberAlbumResponseDtoList = albumService.getAllAlbumsByNickname(memberId);
		return ApiResponse.ok(memberAlbumResponseDtoList);
	}
}
