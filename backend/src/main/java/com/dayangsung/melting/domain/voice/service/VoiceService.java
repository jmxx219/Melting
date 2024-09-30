package com.dayangsung.melting.domain.voice.service;

import java.io.IOException;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.dayangsung.melting.domain.member.entity.Member;
import com.dayangsung.melting.domain.member.repository.MemberRepository;
import com.dayangsung.melting.domain.originalsong.entity.OriginalSong;
import com.dayangsung.melting.domain.originalsong.repository.OriginalSongRepository;
import com.dayangsung.melting.domain.voice.dto.response.VoiceCreateResponseDto;
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
	public VoiceCreateResponseDto addVoice(Long originalSongId, MultipartFile voiceFile, String email) throws
		IOException {

		Member member = memberRepository.findByEmail(email).orElseThrow(RuntimeException::new);
		OriginalSong originalSong = originalSongRepository.findById(originalSongId)
			.orElseThrow(RuntimeException::new);

		boolean voiceExists = voiceRepository.existsByMemberAndOriginalSong(member, originalSong);

		String voiceUrl = awsS3Service.uploadVoice(voiceFile, member.getId(), originalSong.getId());

		Voice voice = Voice.builder()
			.member(member)
			.originalSong(originalSong)
			.voiceUrl(voiceUrl)
			.build();

		voiceRepository.save(voice);

		if (!voiceExists) {
			member.increaseCoverCount();
			memberRepository.save(member);
		}

		// Todo: AI 학습 및 배치 추가 필요

		return VoiceCreateResponseDto.of(voice.getId());

	}

}
