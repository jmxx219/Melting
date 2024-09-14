package com.dayangsung.melting.domain.voice.service;

import com.dayangsung.melting.domain.member.entity.Member;
import com.dayangsung.melting.domain.member.repository.MemberRepository;
import com.dayangsung.melting.domain.originalsong.OriginalSongRepository;
import com.dayangsung.melting.domain.originalsong.entity.OriginalSong;
import com.dayangsung.melting.domain.voice.dto.request.VoiceCreateRequest;
import com.dayangsung.melting.domain.voice.dto.response.VoiceCreateResponse;
import com.dayangsung.melting.domain.voice.entity.Voice;
import com.dayangsung.melting.domain.voice.repository.VoiceRepository;
import com.dayangsung.melting.global.common.service.LocalFileService;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class VoiceService {

    private final MemberRepository memberRepository;
    private final OriginalSongRepository originalSongRepository;
    private final VoiceRepository voiceRepository;
    private final LocalFileService localFileService;


    @Transactional
    public VoiceCreateResponse addVoice(VoiceCreateRequest request, Long memberId) throws IOException {
        Member member = memberRepository.findById(memberId).orElseThrow(RuntimeException::new);
        OriginalSong originalSong = originalSongRepository.findById(request.getSongId()).orElseThrow(RuntimeException::new);

        String voiceUrl = localFileService.saveAudioFile(request.getVoiceFile());

        Voice voice = request.toEntity(member, originalSong, voiceUrl);

        voiceRepository.save(voice);
        return VoiceCreateResponse.of(voice.getId());

    }


}
