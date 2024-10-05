package com.dayangsung.melting.domain.album.dto.response;

import lombok.Builder;

@Builder
public record AlbumTrackInfoDto(
	Long albumId,
	Long currentSongId,
	Long previousSongId,
	Long nextSongId
) {
	public static AlbumTrackInfoDto of(Long albumId, Long currentSongId, Long previousSongId, Long nextSongId) {
		return AlbumTrackInfoDto.builder()
			.albumId(albumId)
			.currentSongId(currentSongId)
			.previousSongId(previousSongId)
			.nextSongId(nextSongId)
			.build();
	}
}
