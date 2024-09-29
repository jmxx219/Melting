package com.dayangsung.melting.domain.song.service;

import org.springframework.stereotype.Component;

import com.dayangsung.melting.domain.song.dto.SongResultDto;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class SongResultReceiver {

	private final ObjectMapper objectMapper;
	private final SongService songService;

	public SongResultReceiver(ObjectMapper objectMapper, SongService songService) {
		this.objectMapper = objectMapper;
		this.songService = songService;
	}

	public void receiveMessage(String message) {
		log.info("Received message from Redis: {}", message);
		try {
			SongResultDto songResult = objectMapper.readValue(message, SongResultDto.class);
			log.info("Parsed SongResultDto: songId={}, songUrl={}", songResult.songId(), songResult.songUrl());
			songService.updateSongUrl(songResult.songId(), songResult.songUrl());
			log.info("Successfully updated song URL for songId: {}", songResult.songId());
		} catch (Exception e) {
			log.error("Error processing received message: ", e);
		}
	}
}
