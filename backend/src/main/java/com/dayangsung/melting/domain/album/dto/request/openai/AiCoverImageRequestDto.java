package com.dayangsung.melting.domain.album.dto.request.openai;

import java.util.List;

import com.dayangsung.melting.domain.originalsong.dto.response.OriginalSongAiResponseDto;

public record AiCoverImageRequestDto(
		List<OriginalSongAiResponseDto> songs
) {
}