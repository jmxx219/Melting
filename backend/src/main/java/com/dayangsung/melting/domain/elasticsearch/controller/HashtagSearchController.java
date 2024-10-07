package com.dayangsung.melting.domain.elasticsearch.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dayangsung.melting.domain.elasticsearch.document.HashtagDocument;
import com.dayangsung.melting.domain.elasticsearch.service.HashtagSearchService;
import com.dayangsung.melting.domain.hashtag.dto.response.HashtagResponseDto;
import com.dayangsung.melting.global.common.response.ApiResponse;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/v2/hashtags")
@RequiredArgsConstructor
public class HashtagSearchController {

	private final HashtagSearchService hashtagSearchService;

	@GetMapping("/index")
	public List<HashtagResponseDto> indexHashtags() {
		return hashtagSearchService.migrateDataToElasticsearch();
	}

	@GetMapping("/search")
	public ApiResponse<List<HashtagResponseDto>> searchHashtags(@RequestParam(name = "query") String query) {
		log.info("searchHashtags -> /api/v2/hashtags/search?query={}", query);
		List<HashtagResponseDto> searchedHashtags = hashtagSearchService.searchHashtags(query);
		return ApiResponse.ok(searchedHashtags);
	}
}
