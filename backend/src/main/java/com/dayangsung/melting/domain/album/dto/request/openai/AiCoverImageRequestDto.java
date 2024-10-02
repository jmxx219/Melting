package com.dayangsung.melting.domain.album.dto.request.openai;

import java.util.List;

import com.dayangsung.melting.domain.originalsong.dto.response.OriginalSongAiResponseDto;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record AiCoverImageRequestDto(
		List<OriginalSongAiResponseDto> songs
) {
}