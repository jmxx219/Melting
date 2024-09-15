package com.dayangsung.melting.domain.voice.dto.request;

import com.dayangsung.melting.domain.member.entity.Member;
import com.dayangsung.melting.domain.originalsong.entity.OriginalSong;
import com.dayangsung.melting.domain.voice.entity.Voice;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import org.springframework.web.multipart.MultipartFile;

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@Schema(name = "보이스 등록 요청")
public record VoiceCreateRequest (
    @NotNull
    Long memberId,
    @NotNull
    Long originalSongId,
    @NotNull
    MultipartFile voiceFile
){

    public Voice toEntity(Member member, OriginalSong originalSong, String voiceUrl) {
        return Voice.builder()
                .member(member)
                .originalSong(originalSong)
                .isTrained(false)
                .voiceUrl(voiceUrl)
                .build();
    }
}
