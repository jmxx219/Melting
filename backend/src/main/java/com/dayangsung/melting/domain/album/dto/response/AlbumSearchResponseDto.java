package com.dayangsung.melting.domain.album.dto.response;

import com.dayangsung.melting.domain.album.entity.Album;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

import lombok.Builder;

// 커뮤니티에서 검색 후 반환되는 앨범 관련 DTO
@Builder
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record AlbumSearchResponseDto(
		Long id,
		String albumCoverImage,
		String albumName,
		String nickname
) {
	public static AlbumSearchResponseDto of(Album album) {
		return AlbumSearchResponseDto.builder()
				.id(album.getId())
				.albumCoverImage(album.getAlbumCoverImage())
				.albumName(album.getAlbumName())
				.nickname(album.getMember().getNickname())
				.build();
	}
}
