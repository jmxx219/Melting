package com.dayangsung.melting.domain.album.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dayangsung.melting.domain.album.dto.request.AlbumCreateRequestDto;
import com.dayangsung.melting.domain.album.dto.request.AlbumUpdateRequestDto;
import com.dayangsung.melting.domain.album.dto.response.AlbumDetailsResponseDto;
import com.dayangsung.melting.domain.album.dto.response.AlbumResponseDto;
import com.dayangsung.melting.domain.album.entity.Album;
import com.dayangsung.melting.domain.album.service.AlbumService;
import com.dayangsung.melting.global.common.response.ApiResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/albums")
public class AlbumController {

	private final AlbumService albumService;

	// 공개 설정된 앨범 조회
	public ApiResponse<List<AlbumResponseDto>> getAlbumList() {
		List<AlbumResponseDto> albumDtos = albumService.getPublicAndNotDeletedAlbums();
		return ApiResponse.ok(albumDtos);
	}

	// 키워드 검색을 통한 앨범 조회
	@GetMapping
	public ApiResponse<List<AlbumResponseDto>> getAlbumListByKeyword(
		@RequestParam(value = "keyword", required = false) String keyword) {
		List<AlbumResponseDto> albumDtos = albumService.searchAlbumsByKeyword(keyword);
		return ApiResponse.ok(albumDtos);
	}

	// 앨범 생성
	@PostMapping
	public ResponseEntity<Album> createAlbum(@RequestBody Album album) {
		Album createdAlbum = albumService.createAlbum(album);
		return new ResponseEntity<>(createdAlbum, HttpStatus.CREATED);
	public ApiResponse<AlbumDetailsResponseDto> createAlbum(
		@RequestBody AlbumCreateRequestDto albumCreateRequestDto) {
		AlbumDetailsResponseDto albumDetailsResponseDto = albumService.createAlbum(albumCreateRequestDto);
		return ApiResponse.ok(albumDetailsResponseDto);
	}

	}
	
}