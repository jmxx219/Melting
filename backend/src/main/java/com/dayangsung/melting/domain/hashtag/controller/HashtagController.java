package com.dayangsung.melting.domain.hashtag.controller;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dayangsung.melting.domain.hashtag.service.HashtagService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/hashtags")
@RequiredArgsConstructor
public class HashtagController {

	private final HashtagService hashtagService;

	@PostMapping("/albums/{albumId}")
	public void addHashtagsToAlbum(@PathVariable Long albumId, @RequestBody List<String> hashtags) {
		hashtagService.addHashtagsToAlbum(albumId, hashtags);
	}

	@GetMapping("/search")
	public Map<String, Object> searchHashtags(
			@RequestParam String keyword,
			@RequestParam(defaultValue = "20") int size,
			@RequestParam(required = false) Object[] searchAfter) {
		return hashtagService.searchHashtags(keyword, size, searchAfter);
	}
}