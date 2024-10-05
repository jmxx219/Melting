package com.dayangsung.melting.domain.album.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dayangsung.melting.domain.album.dto.request.openai.AiDescriptionRequestDto;
import com.dayangsung.melting.domain.album.entity.Album;
import com.dayangsung.melting.domain.album.repository.AlbumRepository;
import com.dayangsung.melting.domain.album.service.openai.OpenAiDescriptionService;
import com.fasterxml.jackson.core.JsonProcessingException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AlbumDescriptionService {

	private final AlbumRepository albumRepository;
	private final OpenAiDescriptionService openAiDescriptionService;

	@Transactional
	public String createAiDescription(AiDescriptionRequestDto aiDescriptionRequestDto) throws
			JsonProcessingException {
		String result = openAiDescriptionService.createAiDescription(aiDescriptionRequestDto);
		// saveAiDescription(albumId, result);
		return result;
	}

	private void saveAiDescription(Long albumId, String albumAiDescription) {
		Album album = albumRepository.findById(albumId)
				.orElseThrow();
		album.updateAlbumDescription(albumAiDescription);
		albumRepository.save(album);
	}
}