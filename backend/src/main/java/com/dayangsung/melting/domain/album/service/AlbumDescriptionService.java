package com.dayangsung.melting.domain.album.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dayangsung.melting.domain.album.dto.request.openai.AiDescriptionRequestDto;
import com.dayangsung.melting.domain.album.entity.Album;
import com.dayangsung.melting.domain.album.repository.AlbumRepository;
import com.dayangsung.melting.domain.album.service.openai.OpenAiDescriptionService;
import com.dayangsung.melting.domain.genre.entity.AlbumGenre;
import com.dayangsung.melting.domain.hashtag.entity.AlbumHashtag;
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

	// 앨범에서 2개의 해시태그 추출
	private List<String> extractHashtags(Album album) {
		List<AlbumHashtag> hashtags = album.getHashtags();
		List<String> toString = new ArrayList<>();
		for (AlbumHashtag albumHashtag : hashtags) {
			toString.add(albumHashtag.toString());
		}
		return toString.stream().limit(2).collect(Collectors.toList());
	}

	// 앨범에서 2개의 장르 추출
	private List<String> extractGenres(Album album) {
		List<AlbumGenre> genres = album.getGenres();
		List<String> toString = new ArrayList<>();
		for (AlbumGenre genre : genres) {
			toString.add(genre.toString());
		}
		return toString.stream().limit(2).collect(Collectors.toList());
	}
}