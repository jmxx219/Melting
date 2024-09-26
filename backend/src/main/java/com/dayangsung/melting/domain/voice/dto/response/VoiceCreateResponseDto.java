package com.dayangsung.melting.domain.voice.dto.response;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record VoiceCreateResponseDto(
	Long voiceId
) {
	public static VoiceCreateResponseDto of(Long voiceId) {
		return new VoiceCreateResponseDto(voiceId);
	}
}
