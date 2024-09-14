package com.dayangsung.melting.domain.voice.dto.response;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class VoiceCreateResponse {
    private Long voiceId;

    public static VoiceCreateResponse of(Long voiceId){
        return VoiceCreateResponse.builder()
                .voiceId(voiceId)
                .build();
    }
}
