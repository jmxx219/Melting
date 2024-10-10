package com.dayangsung.melting.domain.song.dto;

import lombok.Builder;

@Builder
public record SongResultDto(
	String songId,
	String songUrl
) {
}
