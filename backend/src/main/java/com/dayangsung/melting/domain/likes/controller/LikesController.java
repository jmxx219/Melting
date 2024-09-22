package com.dayangsung.melting.domain.likes.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dayangsung.melting.domain.auth.dto.CustomOAuth2User;
import com.dayangsung.melting.domain.likes.service.LikesService;
import com.dayangsung.melting.global.common.response.ApiResponse;

import lombok.RequiredArgsConstructor;

@RequestMapping("/api/v1")
@RestController
@RequiredArgsConstructor
public class LikesController {

	private final LikesService likesService;

	@GetMapping("/albums/{albumId}/likes")
	public ApiResponse<Integer> getAlbumLikesCount(@PathVariable Long albumId) {
		Integer albumLikesCount = likesService.getAlbumLikesCount(albumId);
		return ApiResponse.ok(albumLikesCount);
	}

	@PostMapping("/albums/{albumId}/likes")
	public ApiResponse<Integer> addAlbumLikes(@PathVariable Long albumId,
		@AuthenticationPrincipal CustomOAuth2User customOAuth2User) {
		Integer albumLikesCount = likesService.addAlbumLikes(albumId, customOAuth2User.getId());
		return ApiResponse.ok(albumLikesCount);
	}

	@DeleteMapping("/albums/{albumId}/likes")
	public ApiResponse<Integer> deleteAlbumLikes(@PathVariable Long albumId,
		@AuthenticationPrincipal CustomOAuth2User customOAuth2User) {
		Integer albumLikesCount = likesService.deleteAlbumLikes(albumId, customOAuth2User.getId());
		return ApiResponse.ok(albumLikesCount);
	}

	@GetMapping("/songs/{songId}/likes")
	public ApiResponse<Integer> getSongLikesCount(@PathVariable Long songId) {
		Integer songLikesCount = likesService.getSongLikesCount(songId);
		return ApiResponse.ok(songLikesCount);
	}

	@PostMapping("/songs/{songId}/likes")
	public ApiResponse<Integer> addSongLikes(@PathVariable Long songId,
		@AuthenticationPrincipal CustomOAuth2User customOAuth2User) {
		Integer songLikesCount = likesService.addSongLikes(songId, customOAuth2User.getId());
		return ApiResponse.ok(songLikesCount);
	}

	@DeleteMapping("/songs/{songId}/likes")
	public ApiResponse<Integer> deleteSongLikes(@PathVariable Long songId,
		@AuthenticationPrincipal CustomOAuth2User customOAuth2User) {
		Integer songLikesCount = likesService.deleteSongLikes(songId, customOAuth2User.getId());
		return ApiResponse.ok(songLikesCount);
	}
}
