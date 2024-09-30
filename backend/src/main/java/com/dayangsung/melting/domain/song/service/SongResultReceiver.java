package com.dayangsung.melting.domain.song.service;

import org.springframework.stereotype.Component;

import com.dayangsung.melting.domain.member.dto.MemberModelResultDto;
import com.dayangsung.melting.domain.member.service.MemberService;
import com.dayangsung.melting.domain.song.dto.SongResultDto;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class SongResultReceiver {

	private final ObjectMapper objectMapper;
	private final SongService songService;
	private final MemberService memberService;

	public SongResultReceiver(ObjectMapper objectMapper, SongService songService, MemberService memberService) {
		this.objectMapper = objectMapper;
		this.songService = songService;
		this.memberService = memberService;
	}

	public void receiveMessage(String message, String channel) {
		log.info("Received message from Redis on channel {}: {}", channel, message);
		try {
			if ("song_results".equals(channel)) {
				processSongResult(message);
			} else if ("training_completed".equals(channel)) {
				processTrainingCompleted(message);
			} else {
				log.warn("Received message on unknown channel: {}", channel);
			}
		} catch (Exception e) {
			log.error("Error processing received message: ", e);
		}
	}

	private void processSongResult(String message) throws Exception {
		SongResultDto songResult = objectMapper.readValue(message, SongResultDto.class);
		log.info("Parsed SongResultDto: songId={}, songUrl={}", songResult.songId(), songResult.songUrl());
		songService.updateSongUrl(songResult.songId(), songResult.songUrl());
		log.info("Successfully updated song URL for songId: {}", songResult.songId());
	}

	private void processTrainingCompleted(String message) throws Exception {
		String memberId = message.trim(); // Redis에서 받은 메시지를 직접 memberId로 사용
		log.info("Received memberId: {}", memberId);

		MemberModelResultDto memberResult = new MemberModelResultDto(memberId);
		log.info("Created MemberModelResultDto: memberId={}", memberResult.memberId());

		memberService.updateMemberModelStatus(memberResult.memberId());
		log.info("Successfully updated model status for memberId: {}", memberResult.memberId());

	}
}
