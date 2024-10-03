package com.dayangsung.melting.domain.album.service;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.dayangsung.melting.domain.album.dto.response.openai.AiCoverImageResponseDto;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class AlbumImageUploadService {

	public String parseAiCoverImage(Mono<String> result) throws JsonProcessingException {
		String responseBody = result.block();
		ObjectMapper mapper = new ObjectMapper();
		AiCoverImageResponseDto response = mapper.readValue(responseBody, AiCoverImageResponseDto.class);
		return response.data().getFirst().b64Json();
	}

	public String generateFileName(String directory, String extension) {
		return String.format("%s/%s%s", directory, UUID.randomUUID(), extension);
	}
}