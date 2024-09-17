package com.dayangsung.melting.domain.originalsong.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dayangsung.melting.domain.originalsong.dto.response.OriginalSongResponseDto;
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
	public ApiResponse<List<OriginalSongResponseDto>> getSearchList(@RequestParam String keyword) {

		List<OriginalSongResponseDto> originalSongServiceSearchList = originalSongService.getSearchList(keyword);
		return ApiResponse.ok(originalSongServiceSearchList);
	}

	@GetMapping("/{originalSongId}")
	public ApiResponse<String> getLyrics(@PathVariable Long originalSongId) {

		String lyrics = originalSongService.getLyrics(originalSongId);
		return ApiResponse.ok(lyrics);
	}

	@GetMapping("/{originalSongId}/mr")
	public ApiResponse<String> getMR(@PathVariable Long originalSongId) {

		String mr = originalSongService.getMR(originalSongId);
		return ApiResponse.ok(mr);
	}
}
