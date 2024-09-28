package com.dayangsung.melting.domain.album.controller;

import org.springframework.data.domain.Page;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
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
import com.dayangsung.melting.domain.album.dto.response.AlbumDetailsResponseDto;
import com.dayangsung.melting.domain.album.dto.response.AlbumSearchResponseDto;
import com.dayangsung.melting.domain.album.service.AlbumService;
import com.dayangsung.melting.domain.auth.CustomOAuth2User;
import com.dayangsung.melting.global.common.response.ApiResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/albums")
public class AlbumController {

	private final AlbumService albumService;

	@GetMapping
	public ApiResponse<Page<AlbumSearchResponseDto>> searchAlbum(
		@RequestParam(defaultValue = "0") int page,
		@RequestParam(defaultValue = "10") int size) {

		Page<AlbumSearchResponseDto> albumPage = albumService.searchAlbum(page, size);
		return ApiResponse.ok(albumPage);
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

}