package com.dayangsung.melting.domain.album.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.dayangsung.melting.domain.album.dto.request.AlbumCreateRequestDto;
import com.dayangsung.melting.domain.album.dto.response.AlbumDetailsResponseDto;
import com.dayangsung.melting.domain.album.service.AlbumService;
import com.dayangsung.melting.global.common.response.ApiResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/albums")
public class AlbumController {

	private final AlbumService albumService;

	@PostMapping
	public ApiResponse<AlbumDetailsResponseDto> createAlbum(
		@RequestPart AlbumCreateRequestDto albumCreateRequestDto,
		@RequestPart MultipartFile albumCoverImage) {
		AlbumDetailsResponseDto albumDetailsResponseDto =
			albumService.createAlbum(albumCreateRequestDto, albumCoverImage, "ssafy@ssafy.com");
		return ApiResponse.ok(albumDetailsResponseDto);
	}

}