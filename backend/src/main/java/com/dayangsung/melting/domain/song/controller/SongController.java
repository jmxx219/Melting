package com.dayangsung.melting.domain.song.controller;

import org.springframework.http.MediaType;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.dayangsung.melting.domain.auth.CustomOAuth2User;
import com.dayangsung.melting.domain.song.dto.request.AiCoverSongCreateRequestDto;
import com.dayangsung.melting.domain.song.dto.request.MeltingSongCreateRequestDto;
import com.dayangsung.melting.domain.song.dto.response.SongDetailsResponseDto;
import com.dayangsung.melting.domain.song.dto.response.SongSearchPageResponseDto;
import com.dayangsung.melting.domain.song.service.SongService;
import com.dayangsung.melting.global.aop.LogExecution;
import com.dayangsung.melting.global.common.response.ApiResponse;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/v1/songs")
@RequiredArgsConstructor
@LogExecution
public class SongController {

	private final SongService songService;

	@Operation(summary = "멜팅 곡 생성 API")
	@PostMapping(value = "/melting", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ApiResponse<Boolean> createMeltingSong(
		@ModelAttribute MeltingSongCreateRequestDto meltingSongCreateRequestDto,
		@AuthenticationPrincipal CustomOAuth2User customOAuth2User) throws Exception {

		Long originalSongId = meltingSongCreateRequestDto.originalSongId();
		MultipartFile voiceFile = meltingSongCreateRequestDto.voiceFile();

		// if (!isAudioFile(voiceFile)) {
		// 	return CompletableFuture.completedFuture(
		// 		ResponseEntity.badRequest().body(ApiResponse.error(INVALID_FILE_TYPE.getErrorMessage()))
		// 	);
		// }

		songService.createMeltingSong(customOAuth2User.getName(), originalSongId, voiceFile);
		// .thenApply(result -> ApiResponse.ok(result));
		return ApiResponse.ok(true);
	}

	@Operation(summary = "AI Cover 곡 생성 API")
	@PostMapping(value = "/aicover")
	public ApiResponse<Boolean> createAicoverSong(
		@RequestBody AiCoverSongCreateRequestDto aiCoverSongCreateRequestDto,
		@AuthenticationPrincipal CustomOAuth2User customOAuth2User) throws Exception {

		Long originalSongId = aiCoverSongCreateRequestDto.originalSongId();

		songService.createAiCoverSong(customOAuth2User.getName(), originalSongId);
		return ApiResponse.ok(true);
	}

	@Operation(summary = "곡 상세조회(스트리밍) API")
	@GetMapping("/{songId}")
	public ApiResponse<SongDetailsResponseDto> getSongDetails(
		@PathVariable Long songId,
		@AuthenticationPrincipal CustomOAuth2User customOAuth2User) {
		SongDetailsResponseDto responseDto = songService.getSongDetails(songId, customOAuth2User.getName());
		return ApiResponse.ok(responseDto);
	}

	@Operation(summary = "앨범 생성 시 추가 가능한 곡 페이지 조회")
	@GetMapping
	public ApiResponse<SongSearchPageResponseDto> getSongsForAlbumCreation(
		@RequestParam(required = false) String keyword,
		@RequestParam(defaultValue = "0") int page,
		@RequestParam(defaultValue = "10") int size,
		@AuthenticationPrincipal CustomOAuth2User customOAuth2User) {
		log.debug("keyword: {}", keyword);
		SongSearchPageResponseDto responseDto =
			songService.getSongsForAlbumCreation(customOAuth2User.getName(), keyword, page, size);
		return ApiResponse.ok(responseDto);
	}

	@Operation(summary = "곡 좋아요 개수 조회")
	@GetMapping("/{songId}/likes")
	public ApiResponse<Integer> getSongLikesCount(@PathVariable Long songId) {
		Integer songLikesCount = songService.getSongLikesCount(songId);
		return ApiResponse.ok(songLikesCount);
	}

	@Operation(summary = "곡 좋아요 추가")
	@PostMapping("/{songId}/likes")
	public ApiResponse<Integer> addSongLikes(@PathVariable Long songId,
		@AuthenticationPrincipal CustomOAuth2User customOAuth2User) {
		Integer songLikesCount = songService.increaseSongLikes(songId, customOAuth2User.getName());
		return ApiResponse.ok(songLikesCount);
	}

	@Operation(summary = "곡 좋아요 취소")
	@DeleteMapping("/{songId}/likes")
	public ApiResponse<Integer> deleteSongLikes(@PathVariable Long songId,
		@AuthenticationPrincipal CustomOAuth2User customOAuth2User) {
		Integer songLikesCount = songService.decreaseSongLikes(songId, customOAuth2User.getName());
		return ApiResponse.ok(songLikesCount);
	}

	private boolean isAudioFile(MultipartFile file) {
		String contentType = file.getContentType();
		return "audio/wav".equals(contentType);
	}
}
