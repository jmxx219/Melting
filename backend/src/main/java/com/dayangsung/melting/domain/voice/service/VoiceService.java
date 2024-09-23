package com.dayangsung.melting.domain.voice.service;

import java.io.IOException;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dayangsung.melting.domain.member.entity.Member;
import com.dayangsung.melting.domain.member.repository.MemberRepository;
import com.dayangsung.melting.domain.originalsong.entity.OriginalSong;
import com.dayangsung.melting.domain.originalsong.repository.OriginalSongRepository;
import com.dayangsung.melting.domain.voice.dto.request.VoiceCreateRequest;
import com.dayangsung.melting.domain.voice.dto.response.VoiceCreateResponse;
import com.dayangsung.melting.domain.voice.entity.Voice;
import com.dayangsung.melting.domain.voice.repository.VoiceRepository;
import com.dayangsung.melting.global.common.service.AwsS3Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class VoiceService {

	private final MemberRepository memberRepository;
	private final OriginalSongRepository originalSongRepository;
	private final VoiceRepository voiceRepository;
	private final AwsS3Service awsS3Service;

	@Transactional
	public VoiceCreateResponse addVoice(VoiceCreateRequest request, Long memberId) throws IOException {

		Member member = memberRepository.findById(memberId).orElseThrow(RuntimeException::new);
		OriginalSong originalSong = originalSongRepository.findById(request.originalSongId())
			.orElseThrow(RuntimeException::new);

		boolean voiceExists = voiceRepository.existsByMemberAndOriginalSong(member, originalSong);

		String voiceUrl = awsS3Service.uploadVoice(request.voiceFile(), memberId, request.originalSongId());
		Voice voice = request.toEntity(member, originalSong, voiceUrl);

		voiceRepository.save(voice);

		if (!voiceExists) {
			member.increaseCoverCount();
			memberRepository.save(member);
		}

		// Todo: AI 학습 및 배치 추가 필요

		return VoiceCreateResponse.of(voice.getId());

	}

}
