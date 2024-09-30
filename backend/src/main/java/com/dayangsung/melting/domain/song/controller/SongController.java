package com.dayangsung.melting.domain.song.controller;

import java.util.concurrent.CompletableFuture;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.dayangsung.melting.domain.auth.CustomOAuth2User;
import com.dayangsung.melting.domain.song.dto.request.MeltingSongCreateRequestDto;
import com.dayangsung.melting.domain.song.dto.response.SongDetailsResponseDto;
import com.dayangsung.melting.domain.song.service.SongService;
import com.dayangsung.melting.global.common.response.ApiResponse;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/v1/songs")
@RequiredArgsConstructor
public class SongController {

	private final SongService songService;

	@Operation(summary = "멜팅 곡 생성 API")
	@PostMapping(value = "/melting", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	@Async
	public CompletableFuture<ResponseEntity<ApiResponse<Void>>> createMeltingSong(
		@ModelAttribute MeltingSongCreateRequestDto meltingSongCreateRequestDto,
		@AuthenticationPrincipal CustomOAuth2User customOAuth2User) throws Exception {

		Long originalSongId = meltingSongCreateRequestDto.originalSongId();
		MultipartFile voiceFile = meltingSongCreateRequestDto.voiceFile();

		// if (!isAudioFile(voiceFile)) {
		// 	return CompletableFuture.completedFuture(
		// 		ResponseEntity.badRequest().body(ApiResponse.error(INVALID_FILE_TYPE.getErrorMessage()))
		// 	);
		// }

		return songService.createMeltingSong(customOAuth2User.getId(), originalSongId, voiceFile)
			.thenApply(result -> ResponseEntity.ok(ApiResponse.ok(result)));
	}

	@Operation(summary = "곡 상세조회(스트리밍) API")
	@GetMapping("/{songId}")
	public ApiResponse<SongDetailsResponseDto> getSongDetails(
		@PathVariable Long songId,
		@AuthenticationPrincipal CustomOAuth2User customOAuth2User) {
		SongDetailsResponseDto responseDto = songService.getSongDetails(songId, customOAuth2User.getName());
		return ApiResponse.ok(responseDto);
	}

	private boolean isAudioFile(MultipartFile file) {
		String contentType = file.getContentType();
		return "audio/wav".equals(contentType);
	}
}
