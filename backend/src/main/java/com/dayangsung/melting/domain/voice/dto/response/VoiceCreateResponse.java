package com.dayangsung.melting.domain.voice.dto.response;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record VoiceCreateResponse (
    Long voiceId
){

    public static VoiceCreateResponse of(Long voiceId){
        return new VoiceCreateResponse(voiceId);
    }
}
