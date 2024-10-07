package com.dayangsung.melting.domain.album.dto.request.openai;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

public record AiDescriptionRequestDto (
		List<Long> songs, // Song ID
		List<String> hashtags, // Hashtag content
		List<String> genres, // Genre content
		@JsonProperty("album_name") String albumName
) {
}