package com.dayangsung.melting.domain.voice.controller;

import java.io.IOException;

import org.springframework.http.MediaType;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.dayangsung.melting.domain.auth.dto.CustomOAuth2User;
import com.dayangsung.melting.domain.voice.dto.request.VoiceCreateRequestDto;
import com.dayangsung.melting.domain.voice.dto.response.VoiceCreateResponseDto;
import com.dayangsung.melting.domain.voice.service.VoiceService;
import com.dayangsung.melting.global.common.response.ApiResponse;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/v1/members")
@RequiredArgsConstructor
public class VoiceController {

	private final VoiceService voiceService;

	@Operation(summary = "사용자 보이스 등록 API")
	@PostMapping(value = "/me/voices", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ApiResponse<VoiceCreateResponseDto> addVoice(
		@ModelAttribute VoiceCreateRequestDto voiceCreateRequestDto,
		@AuthenticationPrincipal CustomOAuth2User customOAuth2User) throws IOException {
		Long originalSongId = voiceCreateRequestDto.originalSongId();
		MultipartFile voiceFile = voiceCreateRequestDto.voiceFile();
		VoiceCreateResponseDto response = voiceService.addVoice(originalSongId, voiceFile, customOAuth2User.getId());
		return ApiResponse.ok(response);
	}

}
