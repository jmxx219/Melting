package com.dayangsung.melting.domain.album.dto.request.openai;

import java.util.List;

public record AiCoverImageRequestDto(
		List<Long> songs // Original song ID
) {
}