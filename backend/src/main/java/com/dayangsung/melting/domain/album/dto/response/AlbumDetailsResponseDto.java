package com.dayangsung.melting.domain.album.dto.response;

import java.util.List;

import com.dayangsung.melting.domain.album.entity.Album;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

import lombok.Builder;

@Builder
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record AlbumDetailsResponseDto(
	Long albumId,
	String albumName,
	String category,
	List<String> genres,
	String albumDescription,
	String albumCoverImage,
	Long albumLiked,
	Boolean isPublic
) {
	public static AlbumDetailsResponseDto of(Album album) {
		return new AlbumDetailsResponseDto(
			album.getAlbumId(),
			album.getAlbumName(),
			album.getCategory(),
			album.getGenres(),
			album.getAlbumDescription(),
			album.getAlbumCoverImage(),
			album.getAlbumLiked(),
			album.getIsPublic()
		);
	}
}