package com.dayangsung.melting.domain.album.dto.response;

import com.dayangsung.melting.domain.album.entity.Album;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

import lombok.Builder;

// 커뮤니티 메인에서 보여지는 앨범 관련 DTO
// TODO: 해당 유저가 좋아요한 앨범인지도 반환해야 함
@Builder
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record AlbumMainResponseDto(
	Long id,
	String albumCoverImage,
	String albumName,
	String nickname
) {
	public static AlbumMainResponseDto of(Album album) {
		return AlbumMainResponseDto.builder()
			.id(album.getId())
			.albumCoverImage(album.getAlbumCoverImage())
			.albumName(album.getAlbumName())
			.nickname(album.getMember().getNickname())
			.build();
	}
}
