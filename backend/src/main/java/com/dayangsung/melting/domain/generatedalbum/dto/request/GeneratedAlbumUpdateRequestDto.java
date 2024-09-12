package com.dayangsung.melting.domain.generatedalbum.dto.request;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record GeneratedAlbumUpdateRequestDto(
		String albumName,
		String albumDescription
) {
}
