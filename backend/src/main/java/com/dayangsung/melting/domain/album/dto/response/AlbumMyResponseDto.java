package com.dayangsung.melting.domain.album.dto.response;

import java.time.LocalDateTime;

import com.dayangsung.melting.domain.album.entity.Album;

import lombok.Builder;

@Builder
public record AlbumMyResponseDto(
	Long albumId,
	String albumName,
	String albumCoverImageUrl,
	String creatorNickname,
	LocalDateTime createdAt,
	Boolean isPublic,
	Boolean isLiked,
	Integer likedCount
) {
	public static AlbumMyResponseDto of(Album album, Boolean isLiked, Integer likedCount) {
		return AlbumMyResponseDto.builder()
			.albumId(album.getId())
			.albumName(album.getAlbumName())
			.albumCoverImageUrl(album.getAlbumCoverImageUrl())
			.creatorNickname(album.getMember().getNickname())
			.createdAt(album.getCreatedAt())
			.isPublic(album.getIsPublic())
			.isLiked(isLiked)
			.likedCount(likedCount)
			.build();
	}
}
