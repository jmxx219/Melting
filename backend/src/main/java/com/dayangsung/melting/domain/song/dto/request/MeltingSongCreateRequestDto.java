package com.dayangsung.melting.domain.song.dto.request;

import org.springframework.web.multipart.MultipartFile;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
@Schema(name = "멜팅 곡 등록 요청")
public record MeltingSongCreateRequestDto(
	@NotNull
	Long originalSongId,
	@NotNull
	MultipartFile voiceFile
) {
}
