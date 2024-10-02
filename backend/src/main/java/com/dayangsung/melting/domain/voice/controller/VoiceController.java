package com.dayangsung.melting.domain.voice.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dayangsung.melting.domain.voice.service.VoiceService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/v1/members")
@RequiredArgsConstructor
public class VoiceController {

	private final VoiceService voiceService;

	// @Operation(summary = "사용자 보이스 등록 API")
	// @PostMapping(value = "/me/voices", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	// public ApiResponse<VoiceCreateResponseDto> addVoice(
	// 	@ModelAttribute VoiceCreateRequestDto voiceCreateRequestDto,
	// 	@AuthenticationPrincipal String email) throws IOException {
	// 	Long originalSongId = voiceCreateRequestDto.originalSongId();
	// 	MultipartFile voiceFile = voiceCreateRequestDto.voiceFile();
	// 	VoiceCreateResponseDto response = voiceService.addVoice(originalSongId, voiceFile, email);
	// 	return ApiResponse.ok(response);
	// }

}
