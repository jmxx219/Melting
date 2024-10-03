package com.dayangsung.melting.domain.album.dto.request.openai;

import java.util.List;

public record AiDescriptionRequestDto (
		List<Long> songs, // Song ID
		List<Long> hashtags, // Hashtag ID
		List<Long> genres // Genre ID
) {
}