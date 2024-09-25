package com.dayangsung.melting.domain.album.dto.response;

import com.dayangsung.melting.domain.album.entity.Album;
import com.dayangsung.melting.domain.album.enums.AlbumCategory;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

import lombok.Builder;

// TODO: 수정 필요. 해시태그, 댓글 수, 댓글, 수록곡 추가
@Builder
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record AlbumDetailsResponseDto(
		Long albumId,
		String albumCoverImage,
		String albumName,
		String nickname,
		AlbumCategory category,
		String albumDescription
) {
	public static AlbumDetailsResponseDto of(Album album) {
		return AlbumDetailsResponseDto.builder()
				.albumId(album.getId())
				.albumCoverImage(album.getAlbumCoverImage())
				.albumName(album.getAlbumName())
				.nickname(album.getMember().getNickname())
				.category(album.getCategory())
				.albumDescription(album.getAlbumDescription())
				.build();
	}
}