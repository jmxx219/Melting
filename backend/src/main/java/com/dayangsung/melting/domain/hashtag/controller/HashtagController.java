package com.dayangsung.melting.domain.hashtag.controller;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dayangsung.melting.domain.hashtag.dto.response.HashtagPageResponseDto;
import com.dayangsung.melting.domain.hashtag.dto.response.HashtagResponseDto;
import com.dayangsung.melting.domain.hashtag.service.HashtagService;
import com.dayangsung.melting.global.common.response.ApiResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/hashtags")
@RequiredArgsConstructor
public class HashtagController {

	private final HashtagService hashtagService;

	@GetMapping
	public ApiResponse<HashtagPageResponseDto> searchHashtags(
		@RequestParam(defaultValue = "0") int page,
		@RequestParam(defaultValue = "10") int size,
		@RequestParam(required = false) String keyword) {
		Page<HashtagResponseDto> hashtagsPage = hashtagService.searchHashtags(keyword, page, size);
		return ApiResponse.ok(HashtagPageResponseDto.of(hashtagsPage));
	}
}
