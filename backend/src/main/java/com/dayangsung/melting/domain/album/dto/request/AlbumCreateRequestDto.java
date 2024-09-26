package com.dayangsung.melting.domain.album.dto.request;

import java.util.List;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record AlbumCreateRequestDto(
		@NotNull String albumName,
		String albumCoverImage,
		String albumDescription,
		@NotEmpty List<Long> songs,
		List<String> hashtags,
		List<String> genres
) {
}