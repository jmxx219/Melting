package com.dayangsung.melting.domain.album.dto.request;

import java.util.List;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record AlbumCreateRequestDto(
	String albumName,
	String category,
	List<String> genre,
	String albumDescription,
	String albumCoverImage,
	List<Long> albumTracks
) {
}