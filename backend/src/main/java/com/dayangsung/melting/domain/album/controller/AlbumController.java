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
import com.dayangsung.melting.domain.album.dto.request.openai.AiDescriptionRequestDto;
import com.dayangsung.melting.domain.album.dto.response.AlbumDetailsResponseDto;
import com.dayangsung.melting.domain.album.dto.response.AlbumRankingPageResponseDto;
import com.dayangsung.melting.domain.album.dto.response.AlbumRankingResponseDto;
import com.dayangsung.melting.domain.album.dto.response.AlbumSearchPageResponseDto;
import com.dayangsung.melting.domain.album.dto.response.AlbumTrackInfoDto;
import com.dayangsung.melting.domain.album.service.AlbumCoverImageService;
import com.dayangsung.melting.domain.album.service.AlbumDescriptionService;
import com.dayangsung.melting.domain.album.service.AlbumService;
import com.dayangsung.melting.domain.auth.CustomOAuth2User;
import com.dayangsung.melting.domain.genre.dto.response.GenreResponseDto;
import com.dayangsung.melting.global.aop.LogExecution;
import com.dayangsung.melting.global.common.response.ApiResponse;
import com.fasterxml.jackson.core.JsonProcessingException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/albums")
@LogExecution
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
		@RequestPart(required = false) MultipartFile albumCoverImage,
		@AuthenticationPrincipal CustomOAuth2User customOAuth2User) {
		AlbumDetailsResponseDto albumDetailsResponseDto =
			albumService.createAlbum(albumCreateRequestDto, albumCoverImage, customOAuth2User.getName());
		return ApiResponse.ok(albumDetailsResponseDto);
	}

	@GetMapping("/{albumId}")
	public ApiResponse<AlbumDetailsResponseDto> getAlbumDetails(@PathVariable Long albumId,
		@AuthenticationPrincipal CustomOAuth2User customOAuth2User) {
		AlbumDetailsResponseDto albumDetailsResponseDto =
			albumService.getAlbumDetails(albumId, customOAuth2User.getName());
		return ApiResponse.ok(albumDetailsResponseDto);
	}

	@PatchMapping("/{albumId}")
	public ApiResponse<AlbumDetailsResponseDto> updateAlbumDescription(@PathVariable Long albumId,
		@RequestBody AlbumUpdateRequestDto albumUpdateRequestDto,
		@AuthenticationPrincipal CustomOAuth2User customOAuth2User) {
		AlbumDetailsResponseDto albumDetailsResponseDto = albumService.updateAlbumDescription(albumId,
			albumUpdateRequestDto.description(), customOAuth2User.getName());
		return ApiResponse.ok(albumDetailsResponseDto);
	}

	@DeleteMapping("/{albumId}")
	public ApiResponse<Void> deleteAlbum(@PathVariable Long albumId,
		@AuthenticationPrincipal CustomOAuth2User customOAuth2User) {
		albumService.deleteAlbum(albumId, customOAuth2User.getName());
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
	public ApiResponse<Boolean> toggleIsPublic(@PathVariable Long albumId,
		@AuthenticationPrincipal CustomOAuth2User customOAuth2User) {
		Boolean toggledIsPublic = albumService.toggleIsPublic(albumId, customOAuth2User.getName());
		return ApiResponse.ok(toggledIsPublic);
	}

	@PostMapping("/covers")
	public ApiResponse<String> createAiAlbumCoverImage(
		@RequestBody AiCoverImageRequestDto aiCoverImageRequestDto) throws IOException {
		String base64Image = albumCoverImageService.createAiCoverImage(aiCoverImageRequestDto.songs());
		return ApiResponse.ok(base64Image);
	}

	@PostMapping("/descriptions")
	public ApiResponse<String> createAiDescription(
		@RequestBody AiDescriptionRequestDto aiDescriptionRequestDto) throws JsonProcessingException {
		String description = albumDescriptionService.createAiDescription(aiDescriptionRequestDto);
		return ApiResponse.ok(description);
	}

	@GetMapping("/genres")
	public ApiResponse<List<GenreResponseDto>> getAllGenres() {
		List<GenreResponseDto> genreResponse = albumService.getAllGenres();
		return ApiResponse.ok(genreResponse);
	}

	@GetMapping("/{albumId}/likes")
	public ApiResponse<Integer> getAlbumLikesCount(@PathVariable Long albumId) {
		Integer albumLikesCount = albumService.getAlbumLikesCount(albumId);
		return ApiResponse.ok(albumLikesCount);
	}

	@GetMapping("/steady")
	public ApiResponse<List<AlbumRankingResponseDto>> getSteadyAlbums() {
		List<AlbumRankingResponseDto> steadyAlbums = albumService.getSteadyAlbums();
		return ApiResponse.ok(steadyAlbums);
	}

	@GetMapping("/daily")
	public ApiResponse<List<AlbumRankingResponseDto>> getHot5Albums() {
		List<AlbumRankingResponseDto> hot5Albums = albumService.getHot5Albums();
		return ApiResponse.ok(hot5Albums);
	}

	@GetMapping("/monthly")
	public ApiResponse<List<AlbumRankingResponseDto>> getMonthlyAlbums() {
		List<AlbumRankingResponseDto> monthlyAlbums = albumService.getMonthlyTop5Albums();
		return ApiResponse.ok(monthlyAlbums);
	}

	@PostMapping("/{albumId}/likes")
	public ApiResponse<Integer> addAlbumLikes(@PathVariable Long albumId,
		@AuthenticationPrincipal CustomOAuth2User customOAuth2User) {
		Integer albumLikesCount = albumService.increaseAlbumLikes(albumId, customOAuth2User.getName());
		return ApiResponse.ok(albumLikesCount);
	}

	@DeleteMapping("/{albumId}/likes")
	public ApiResponse<Integer> deleteAlbumLikes(@PathVariable Long albumId,
		@AuthenticationPrincipal CustomOAuth2User customOAuth2User) {
		Integer albumLikesCount = albumService.decreaseAlbumLikes(albumId, customOAuth2User.getName());
		return ApiResponse.ok(albumLikesCount);
	}

	@GetMapping("/hashtags/{hashtag}")
	public ApiResponse<AlbumRankingPageResponseDto> getAlbumPageContainsHashtag(
		@RequestParam(defaultValue = "0") int page,
		@RequestParam(defaultValue = "10") int size,
		@PathVariable("hashtag") String hashtagContent) {
		AlbumRankingPageResponseDto albumPageByHashtag = albumService.findByHashtag(hashtagContent, page, size);
		return ApiResponse.ok(albumPageByHashtag);
	}

	@GetMapping("/{albumId}/tracks")
	public ApiResponse<List<AlbumTrackInfoDto>> getTrackListInfo(@PathVariable Long albumId) {
		List<AlbumTrackInfoDto> trackInfo = albumService.getTrackListInfo(albumId);
		return ApiResponse.ok(trackInfo);
	}
}