package com.dayangsung.melting.domain.voice.dto.response;

public record VoiceCreateResponseDto(
	Long voiceId
) {
	public static VoiceCreateResponseDto of(Long voiceId) {
		return new VoiceCreateResponseDto(voiceId);
	}
}
