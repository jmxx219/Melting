package com.dayangsung.melting.domain.album.dto.response;

import com.dayangsung.melting.domain.album.entity.Album;

import lombok.Builder;

@Builder
public record AlbumSearchResponseDto(
	Long albumId,
	String albumCoverImageUrl,
	String albumName,
	String creatorNickname
) {
	public static AlbumSearchResponseDto of(Album album) {
		return AlbumSearchResponseDto.builder()
			.albumId(album.getId())
			.albumCoverImageUrl(album.getAlbumCoverImageUrl())
			.albumName(album.getAlbumName())
			.creatorNickname(album.getMember().getNickname())
			.build();
	}
}
