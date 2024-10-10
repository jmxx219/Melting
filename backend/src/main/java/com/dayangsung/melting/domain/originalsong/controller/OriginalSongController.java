package com.dayangsung.melting.domain.originalsong.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dayangsung.melting.domain.originalsong.dto.response.OriginalSongResponseDto;
import com.dayangsung.melting.domain.originalsong.dto.response.OriginalSongSearchPageResponseDto;
import com.dayangsung.melting.domain.originalsong.service.OriginalSongService;
import com.dayangsung.melting.global.aop.LogExecution;
import com.dayangsung.melting.global.common.response.ApiResponse;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/v1/original-songs")
@RequiredArgsConstructor
@LogExecution
public class OriginalSongController {

	private final OriginalSongService originalSongService;

	@Operation(summary = "원곡 검색 페이지 조회")
	@GetMapping
	public ApiResponse<OriginalSongSearchPageResponseDto> getSearchPage(
		@RequestParam(required = false) String keyword,
		@RequestParam(defaultValue = "0") int page,
		@RequestParam(defaultValue = "10") int size) {
		OriginalSongSearchPageResponseDto originalSongPage =
			originalSongService.getSearchPage(keyword, page, size);
		return ApiResponse.ok(originalSongPage);
	}

	@Operation(summary = "원곡 id로 정보 조회")
	@GetMapping("/{originalSongId}")
	public ApiResponse<OriginalSongResponseDto> getOriginalSongInfo(@PathVariable Long originalSongId) {

		OriginalSongResponseDto originalSongResponseDto = originalSongService.getOriginalSongInfo(originalSongId);
		return ApiResponse.ok(originalSongResponseDto);
	}
}
