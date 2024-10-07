package com.dayangsung.melting.domain.hashtag.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dayangsung.melting.domain.hashtag.dto.response.HashtagPageResponseDto;
import com.dayangsung.melting.domain.hashtag.dto.response.HashtagResponseDto;
import com.dayangsung.melting.domain.hashtag.service.HashtagService;
import com.dayangsung.melting.global.aop.LogExecution;
import com.dayangsung.melting.global.common.response.ApiResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/hashtags")
@RequiredArgsConstructor
@LogExecution
public class HashtagController {

	private final HashtagService hashtagService;

	@GetMapping
	public ApiResponse<HashtagPageResponseDto> searchHashtags(
		@RequestParam(name = "page", defaultValue = "0") int page,
		@RequestParam(name = "size", defaultValue = "10") int size,
		@RequestParam(name = "keyword", required = false) String keyword) {
		HashtagPageResponseDto hashtagsPage = hashtagService.searchHashtags(PageRequest.of(page, size), keyword);
		return ApiResponse.ok(hashtagsPage);
	}

	@PostMapping("/index")
	public List<HashtagResponseDto> indexHashtags() {
		return hashtagService.migrateDataToElasticsearch();
	}
}
