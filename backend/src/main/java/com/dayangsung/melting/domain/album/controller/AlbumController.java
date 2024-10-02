package com.dayangsung.melting.domain.album.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.dayangsung.melting.domain.album.dto.request.AlbumCreateRequestDto;
import com.dayangsung.melting.domain.album.dto.request.AlbumUpdateRequestDto;
import com.dayangsung.melting.domain.album.dto.request.openai.AiCoverImageRequestDto;
import com.dayangsung.melting.domain.album.dto.response.AlbumDetailsResponseDto;
import com.dayangsung.melting.domain.album.dto.response.AlbumSearchPageResponseDto;
import com.dayangsung.melting.domain.album.service.AlbumCoverImageService;
import com.dayangsung.melting.domain.album.service.AlbumDescriptionService;
import com.dayangsung.melting.domain.album.service.AlbumService;
import com.dayangsung.melting.domain.auth.CustomOAuth2User;
import com.dayangsung.melting.domain.originalsong.dto.response.OriginalSongAiResponseDto;
import com.dayangsung.melting.global.common.response.ApiResponse;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/albums")
public class AlbumController {

	private final AlbumService albumService;
	private final AlbumCoverImageService albumCoverImageService;
	private final AlbumDescriptionService albumDescriptionService;

	@GetMapping
	public ApiResponse<AlbumSearchPageResponseDto> getAlbums(
		@RequestParam(defaultValue = "0") int sort,
		@RequestParam(defaultValue = "0") int page,
		@RequestParam(defaultValue = "10") int size) {
		AlbumSearchPageResponseDto albumSearchPage = albumService.getAlbums(sort, page, size);
		return ApiResponse.ok(albumSearchPage);
	}

	@PostMapping
	public ApiResponse<AlbumDetailsResponseDto> createAlbum(
		@RequestPart AlbumCreateRequestDto albumCreateRequestDto,
		@RequestPart MultipartFile albumCoverImage,
		@AuthenticationPrincipal CustomOAuth2User customOAuth2User) {
		AlbumDetailsResponseDto albumDetailsResponseDto =
			albumService.createAlbum(albumCreateRequestDto, albumCoverImage, customOAuth2User.getName());
		return ApiResponse.ok(albumDetailsResponseDto);
	}

	@GetMapping("/{albumId}")
	public ApiResponse<AlbumDetailsResponseDto> getAlbumDetails(@PathVariable Long albumId) {
		AlbumDetailsResponseDto albumDetailsResponseDto =
			albumService.getAlbumDetails(albumId);
		return ApiResponse.ok(albumDetailsResponseDto);
	}

	@PatchMapping("/{albumId}")
	public ApiResponse<AlbumDetailsResponseDto> updateAlbumDescription(@PathVariable Long albumId,
		@RequestBody AlbumUpdateRequestDto albumUpdateRequestDto) {
		AlbumDetailsResponseDto albumDetailsResponseDto = albumService.updateAlbumDescription(albumId,
			albumUpdateRequestDto.description());
		return ApiResponse.ok(albumDetailsResponseDto);
	}

	@DeleteMapping("/{albumId}")
	public ApiResponse<Void> deleteAlbum(@PathVariable Long albumId) {
		albumService.deleteAlbum(albumId);
		return ApiResponse.ok(null);
	}

	@GetMapping("/search")
	public ApiResponse<AlbumSearchPageResponseDto> searchAlbums(
		@RequestParam(defaultValue = "0") int page,
		@RequestParam(defaultValue = "10") int size,
		@RequestParam(required = false) String keyword,
		@RequestParam List<String> options
	) {
		AlbumSearchPageResponseDto albumSearchPage = albumService.searchAlbum(page, size, keyword, options);
		return ApiResponse.ok(albumSearchPage);
	}

	@PatchMapping("/{albumId}/toggle")
	public ApiResponse<Boolean> toggleIsPublic(@PathVariable Long albumId) {
		Boolean toggledIsPublic = albumService.toggleIsPublic(albumId);
		return ApiResponse.ok(toggledIsPublic);
	}

	// 생성형 AI를 통해 배경 사진을 만듦
	@PostMapping("/{albumId}/covers")
	public ApiResponse<String> createAiAlbumCoverImage(@PathVariable Long albumId,
			@RequestBody AiCoverImageRequestDto aiCoverImageRequestDto) throws IOException {
		List<OriginalSongAiResponseDto> songs = aiCoverImageRequestDto.songs();
		String base64Image = albumCoverImageService.createAiCoverImage(albumId, songs);
		return ApiResponse.ok(base64Image);
	}

}