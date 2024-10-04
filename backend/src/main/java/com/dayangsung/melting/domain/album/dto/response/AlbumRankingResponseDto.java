package com.dayangsung.melting.domain.album.dto.response;

import com.dayangsung.melting.domain.album.entity.Album;

import lombok.Builder;

@Builder
public record AlbumRankingResponseDto (
	Long albumId,
	String albumName,
	String creatorNickname,
	String albumCoverImage
){
	public static AlbumRankingResponseDto of(Album album) {
		return AlbumRankingResponseDto.builder()
			.albumId(album.getId())
			.albumName(album.getAlbumName())
			.creatorNickname(album.getMember().getNickname())
			.albumCoverImage(album.getAlbumCoverImageUrl())
			.build();
	}
}