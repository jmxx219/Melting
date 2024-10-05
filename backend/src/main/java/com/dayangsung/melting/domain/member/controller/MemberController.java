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

import com.dayangsung.melting.domain.album.dto.response.AlbumMyPageResponseDto;
import com.dayangsung.melting.domain.auth.CustomOAuth2User;
import com.dayangsung.melting.domain.member.dto.request.MemberInitRequestDto;
import com.dayangsung.melting.domain.member.dto.request.MemberUpdateRequestDto;
import com.dayangsung.melting.domain.member.dto.response.MemberResponseDto;
import com.dayangsung.melting.domain.member.dto.response.MemberSongCountsResponseDto;
import com.dayangsung.melting.domain.member.enums.Gender;
import com.dayangsung.melting.domain.member.service.MemberService;
import com.dayangsung.melting.domain.song.dto.response.SongLikesPageResponseDto;
import com.dayangsung.melting.domain.song.dto.response.SongMypagePageResponseDto;
import com.dayangsung.melting.global.aop.LogExecution;
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
@LogExecution
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
		@RequestPart MemberInitRequestDto memberInitRequestDto,
		@AuthenticationPrincipal CustomOAuth2User customOAuth2User) {
		log.debug("member service nickname {}", memberInitRequestDto.nickname());
		MemberResponseDto memberResponseDto =
			memberService.initMemberInfo(multipartFile,
				memberInitRequestDto.nickname(),
				Gender.valueOf(memberInitRequestDto.gender().toUpperCase()),
				customOAuth2User.getName());
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

	@Operation(summary = "마이페이지에서 사용자가 생성한 곡 목록")
	@GetMapping("/me/songs")
	public ApiResponse<SongMypagePageResponseDto> getMemberSongs(
		@RequestParam(defaultValue = "0") int page,
		@RequestParam(defaultValue = "10") int size,
		@AuthenticationPrincipal CustomOAuth2User customOAuth2User) {
		SongMypagePageResponseDto songMypagePageResponseDto = memberService.getMemberSongs(customOAuth2User.getName(),
			page, size);
		return ApiResponse.ok(songMypagePageResponseDto);
	}

	@Operation(summary = "사용자가 멜팅한 곡 개수 조회", description = "3개 이상이면 AI Cover 가능")
	@GetMapping("/me/songcounts")
	public ApiResponse<MemberSongCountsResponseDto> getMeltingCounts(
		@AuthenticationPrincipal CustomOAuth2User customOAuth2User) {
		MemberSongCountsResponseDto songCountsResponseDto = memberService.getMemberSongsCounts(
			customOAuth2User.getName());
		return ApiResponse.ok(songCountsResponseDto);
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

	@GetMapping("/me/albums")
	public ApiResponse<AlbumMyPageResponseDto> getMemberAlbums(
		@RequestParam(defaultValue = "0") int sort,
		@RequestParam(defaultValue = "0") int page,
		@RequestParam(defaultValue = "10") int size,
		@AuthenticationPrincipal CustomOAuth2User customOAuth2User) {
		AlbumMyPageResponseDto albumMyPageResponseDto =
			memberService.getMemberAlbums(customOAuth2User.getName(), sort, page, size);
		return ApiResponse.ok(albumMyPageResponseDto);
	}

	@GetMapping("/me/likes/albums")
	public ApiResponse<AlbumMyPageResponseDto> getMemberLikesAlbums(
		@RequestParam(defaultValue = "0") int sort,
		@RequestParam(defaultValue = "0") int page,
		@RequestParam(defaultValue = "10") int size,
		@AuthenticationPrincipal CustomOAuth2User customOAuth2User) {
		AlbumMyPageResponseDto albumMyPageResponseDto =
			memberService.getMemberLikesAlbums(customOAuth2User.getName(), sort, page, size);
		return ApiResponse.ok(albumMyPageResponseDto);
	}

	@GetMapping("/me/likes/songs")
	public ApiResponse<SongLikesPageResponseDto> getMemberLikesSongs(
		@RequestParam(defaultValue = "0") int sort,
		@RequestParam(defaultValue = "0") int page,
		@RequestParam(defaultValue = "10") int size,
		@AuthenticationPrincipal CustomOAuth2User customOAuth2User) {
		SongLikesPageResponseDto songLikesPageResponseDto =
			memberService.getMemberLikesSongs(customOAuth2User.getName(), sort, page, size);
		return ApiResponse.ok(songLikesPageResponseDto);
	}
}
