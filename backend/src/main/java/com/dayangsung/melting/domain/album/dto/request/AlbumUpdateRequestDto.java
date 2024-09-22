package com.dayangsung.melting.domain.album.dto.request;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record AlbumUpdateRequestDto(
		String albumName,
		String albumDescription
) {
}
