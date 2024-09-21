package com.dayangsung.melting.domain.album.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dayangsung.melting.domain.album.dto.request.AlbumCreateRequestDto;
import com.dayangsung.melting.domain.album.dto.request.AlbumUpdateRequestDto;
import com.dayangsung.melting.domain.album.dto.response.AlbumDetailsResponseDto;
import com.dayangsung.melting.domain.album.dto.response.AlbumMainResponseDto;
import com.dayangsung.melting.domain.album.dto.response.AlbumSearchResponseDto;
import com.dayangsung.melting.domain.album.dto.response.AlbumUpdateResponseDto;
import com.dayangsung.melting.domain.album.service.AlbumService;
import com.dayangsung.melting.global.common.response.ApiResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/albums")
public class AlbumController {

	private final AlbumService albumService;

	// 커뮤니티 메인 페이지에 보여지는 앨범 조회, 기본값은 최신순
	@GetMapping("/main")
	public ApiResponse<List<AlbumMainResponseDto>> getAlbumsInCommunityMainPage(
			@RequestParam(value = "sort", defaultValue = "latest") String sort) {
		List<AlbumMainResponseDto> albumMainResponseDtoList = albumService.getAlbumsSorted(sort);
		return ApiResponse.ok(albumMainResponseDtoList);
	}

	// 키워드 검색을 통한 앨범 조회
	@GetMapping("/search")
	public ApiResponse<List<AlbumSearchResponseDto>> searchAlbumsByKeyword(
			@RequestParam(value = "keyword") String keyword) {
		List<AlbumSearchResponseDto> result = new ArrayList<>();
		result.addAll(albumService.searchAlbumsByAlbumName(keyword));
		result.addAll(albumService.searchAlbumsBySongName(keyword));
		result.addAll(albumService.searchAlbumsByHashtag(keyword));
		result.addAll(albumService.searchAlbumsByGenre(keyword));
		return ApiResponse.ok(result);
	}

	// 앨범 생성
	// TODO: 수정 필요
	@PostMapping
	public ApiResponse<AlbumUpdateResponseDto> createAlbum(
		@RequestBody AlbumCreateRequestDto albumCreateRequestDto) {
		AlbumUpdateResponseDto albumUpdateResponseDto = albumService.createAlbum(albumCreateRequestDto);
		return ApiResponse.ok(albumUpdateResponseDto);
	}

	// 앨범 상세정보 조회
	@GetMapping("/{albumId}")
	public ApiResponse<AlbumDetailsResponseDto> getAlbumDetails(@PathVariable Long albumId) {
		AlbumDetailsResponseDto albumDetails = albumService.getAlbumDetails(albumId);
		return ApiResponse.ok(albumDetails);
	}

	// 앨범 수정
	@PatchMapping("/{albumId}")
	public ApiResponse<AlbumUpdateResponseDto> updateAlbum(
		@PathVariable Long albumId,
		@RequestBody AlbumUpdateRequestDto albumUpdateRequestDto) {
		AlbumUpdateResponseDto updatedAlbumDto = albumService.updateAlbum(albumId, albumUpdateRequestDto);
		return ApiResponse.ok(updatedAlbumDto);
	}
	
}