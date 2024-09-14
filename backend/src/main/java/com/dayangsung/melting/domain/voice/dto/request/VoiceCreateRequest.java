package com.dayangsung.melting.domain.voice.dto.request;

import com.dayangsung.melting.domain.member.entity.Member;
import com.dayangsung.melting.domain.originalsong.entity.OriginalSong;
import com.dayangsung.melting.domain.voice.entity.Voice;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class VoiceCreateRequest {
    private Long songId;
    private MultipartFile voiceFile;

    public Voice toEntity(Member member, OriginalSong originalSong, String voiceUrl) {
        return Voice.builder()
                .member(member)
                .originalSong(originalSong)
                .isTrained(false)
                .voiceUrl(voiceUrl)
                .build();
    }
}
