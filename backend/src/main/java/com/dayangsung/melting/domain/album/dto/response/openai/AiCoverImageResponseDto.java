
package com.dayangsung.melting.domain.album.dto.response.openai;


import java.util.List;

public record AiCoverImageResponseDto(
		long created,
		List<ImageObject> data) {
}