package com.dayangsung.melting.domain.generatedalbum.dto.response;

import com.dayangsung.melting.domain.generatedalbum.entity.GeneratedAlbum;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

import lombok.Builder;

@Builder
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record GeneratedAlbumResponseDto(
		String albumName,
		String albumDescription
) {
	public static GeneratedAlbumResponseDto of(GeneratedAlbum album) {
		return GeneratedAlbumResponseDto.builder()
				.albumName(album.getAlbumName())
				.albumDescription(album.getAlbumDescription())
				.build();
	}
}
