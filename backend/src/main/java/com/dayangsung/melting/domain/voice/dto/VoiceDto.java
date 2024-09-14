package com.dayangsung.melting.domain.voice.dto;

import com.dayangsung.melting.domain.voice.entity.Voice;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class VoiceDto {
    private Long id;
    private Long memberId;
    private Long songId;
    private boolean isTrained;
    private String voiceUrl;

    public static VoiceDto of(Voice voice) {
        return VoiceDto.builder()
                .id(voice.getId())
                .memberId(voice.getMember().getId())
                .songId(voice.getOriginalSong().getId())
                .isTrained(voice.isTrained())
                .voiceUrl(voice.getVoiceUrl())
                .build();
    }
}
