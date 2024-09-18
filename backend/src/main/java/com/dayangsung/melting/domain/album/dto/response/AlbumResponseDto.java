package com.dayangsung.melting.domain.album.dto.response;

import com.dayangsung.melting.domain.album.entity.Album;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

import lombok.Builder;

@Builder
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record AlbumResponseDto(
		String albumName,
		String albumDescription
) {
	public static AlbumResponseDto of(Album album) {
		return AlbumResponseDto.builder()
				.albumName(album.getAlbumName())
				.albumDescription(album.getAlbumDescription())
				.build();
	}
}
