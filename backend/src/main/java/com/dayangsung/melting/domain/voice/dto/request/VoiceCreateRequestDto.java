package com.dayangsung.melting.domain.voice.dto.request;

import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@Schema(name = "보이스 등록 요청")
public record VoiceCreateRequestDto(
	@NotNull
	Long originalSongId,
	@NotNull
	MultipartFile voiceFile
) {
}
