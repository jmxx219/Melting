package com.dayangsung.melting.domain.originalsong.controller;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dayangsung.melting.domain.originalsong.dto.response.OriginalSongResponseDto;
import com.dayangsung.melting.domain.originalsong.dto.response.OriginalSongSearchResponseDto;
import com.dayangsung.melting.domain.originalsong.service.OriginalSongService;
import com.dayangsung.melting.global.common.response.ApiResponse;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/v1/original-songs")
@RequiredArgsConstructor
public class OriginalSongController {

	private final OriginalSongService originalSongService;

	@GetMapping
	public ApiResponse<Page<OriginalSongSearchResponseDto>> getSearchPage(
		@RequestParam String keyword,
		@RequestParam(defaultValue = "0") int page,
		@RequestParam(defaultValue = "10") int size) {
		Page<OriginalSongSearchResponseDto> originalSongServiceSearchPage =
			originalSongService.getSearchPage(keyword, page, size);
		return ApiResponse.ok(originalSongServiceSearchPage);
	}

	@GetMapping("/{originalSongId}")
	public ApiResponse<OriginalSongResponseDto> getOriginalSongInfo(@PathVariable Long originalSongId) {

		OriginalSongResponseDto originalSongResponseDto = originalSongService.getOriginalSongInfo(originalSongId);
		return ApiResponse.ok(originalSongResponseDto);
	}
}
