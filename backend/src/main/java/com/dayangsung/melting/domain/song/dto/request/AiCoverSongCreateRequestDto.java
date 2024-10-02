package com.dayangsung.melting.domain.song.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
@Schema(name = "AI 커버곡 등록 요청")
public record AiCoverSongCreateRequestDto(
	Long originalSongId
) {
}
