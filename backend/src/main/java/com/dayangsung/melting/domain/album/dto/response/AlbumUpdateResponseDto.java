package com.dayangsung.melting.domain.album.dto.response;

import com.dayangsung.melting.domain.album.entity.Album;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record AlbumUpdateResponseDto(
		Long albumId
) {
	public static AlbumUpdateResponseDto of(Album album) {
		return new AlbumUpdateResponseDto(album.getAlbumId());
	}
}
