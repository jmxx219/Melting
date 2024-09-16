package com.dayangsung.melting.domain.song.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dayangsung.melting.domain.song.dto.response.SongDetailResponseDto;
import com.dayangsung.melting.domain.song.service.SongService;
import com.dayangsung.melting.global.common.response.ApiResponse;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/v1/songs")
@RequiredArgsConstructor
public class SongController {

	private final SongService songService;

	@GetMapping("/{songId}")
	public ApiResponse<SongDetailResponseDto> getSongDetail(@PathVariable Long songId) {
		SongDetailResponseDto responseDto = songService.getSongDetail(songId);
		return ApiResponse.ok(responseDto);
	}
}
