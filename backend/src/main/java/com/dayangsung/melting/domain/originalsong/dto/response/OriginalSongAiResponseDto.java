package com.dayangsung.melting.domain.originalsong.dto.response;

import com.dayangsung.melting.domain.originalsong.entity.OriginalSong;

import lombok.Builder;

@Builder
public record OriginalSongAiResponseDto(
		Long originalSongId,
		String lyrics
) {
	public static OriginalSongAiResponseDto of(OriginalSong originalSong) {
		return OriginalSongAiResponseDto.builder()
				.originalSongId(originalSong.getId())
				.lyrics(originalSong.getLyrics())
				.build();
	}
}
