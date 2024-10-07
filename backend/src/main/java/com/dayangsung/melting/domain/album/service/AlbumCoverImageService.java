package com.dayangsung.melting.domain.album.service;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dayangsung.melting.domain.album.dto.response.openai.AiCoverImageResponseDto;
import com.dayangsung.melting.domain.album.entity.Album;
import com.dayangsung.melting.domain.album.repository.AlbumRepository;
import com.dayangsung.melting.domain.album.service.openai.OpenAiImageService;
import com.dayangsung.melting.global.common.service.AwsS3Service;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class AlbumCoverImageService {

	@Lazy
	private final OpenAiImageService openAiImageService;
	private final AwsS3Service awsS3Service;
	private final AlbumRepository albumRepository;

	@Transactional
	public String createAiCoverImage(List<Long> originalSongs) throws IOException {
		String[] result = openAiImageService.createAiCoverImage(originalSongs);
		// // S3에 저장할 시
		// String url = awsS3Service.uploadBase64ImageToS3(result[0], result[1]);
		// base64 반환 시
		String base64Image = result[0];

		// TODO: DB에 저장 로직 검토
		// saveAlbumCoverImage(albumId, result[0], result[1]);
		return base64Image;
	}

	private void saveAlbumCoverImage(Long albumId, String albumCoverImageUrl, String fileName) {
		Album album = albumRepository.findById(albumId)
			.orElseThrow();
		album.updateAlbumCoverImageUrl(albumCoverImageUrl);
		albumRepository.save(album);
	}

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