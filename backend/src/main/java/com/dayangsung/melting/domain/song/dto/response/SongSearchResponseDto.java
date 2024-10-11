package com.dayangsung.melting.domain.song.dto.response;

import com.dayangsung.melting.domain.originalsong.entity.OriginalSong;
import com.dayangsung.melting.domain.song.entity.Song;

import lombok.Builder;

@Builder
public record SongSearchResponseDto(
	String originalSongTitle,
	String originalSongArtist,
	String albumCoverImage,
	Long meltingSongId,
	Long aiCoverSongId
) {
	public static SongSearchResponseDto of(OriginalSong originalSong, String albumCoverImage, Long meltingSongId, Long aiCoverSongId) {
		return SongSearchResponseDto.builder()
			.originalSongTitle(originalSong.getTitle())
			.originalSongArtist(originalSong.getArtist())
			.albumCoverImage(albumCoverImage)
			.meltingSongId(meltingSongId)
			.aiCoverSongId(aiCoverSongId)
			.build();
	}
}
