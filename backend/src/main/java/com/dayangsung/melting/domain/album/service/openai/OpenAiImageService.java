package com.dayangsung.melting.domain.album.service.openai;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.ExchangeStrategies;
import org.springframework.web.reactive.function.client.WebClient;

import com.dayangsung.melting.domain.album.service.AlbumImageUploadService;
import com.dayangsung.melting.domain.song.entity.Song;
import com.fasterxml.jackson.core.JsonProcessingException;

import reactor.core.publisher.Mono;

@Service
public class OpenAiImageService {

	private final OpenAiLyricsSummaryService openAiLyricsSummaryService;
	private final AlbumImageUploadService albumImageUploadService;
	private final WebClient webClient;

	public OpenAiImageService(@Value("${openai.api-key}") String openAiApiKey,
			AlbumImageUploadService albumImageUploadService, OpenAiLyricsSummaryService openAiLyricsSummaryService) {
		this.albumImageUploadService = albumImageUploadService;
		this.openAiLyricsSummaryService = openAiLyricsSummaryService;
		this.webClient = WebClient.builder()
				.exchangeStrategies(ExchangeStrategies.builder()
						.codecs(configurer -> configurer.defaultCodecs().maxInMemorySize(10 * 1024 * 1024))
						.build())
				.baseUrl("https://api.openai.com/v1")
				.defaultHeader("Authorization", "Bearer " + openAiApiKey)
				.build();
	}

	public String[] createAiCoverImage(List<Song> songs) throws JsonProcessingException {

		// 가사 합치기
		Mono<String> lyricsResult = openAiLyricsSummaryService.summarizeLyrics(songs);
		Mono<String> imageResult = requestImageGeneration(lyricsResult.block());
		// Mono<String> imageResult = requestImageGeneration("하루하루 네가 그리워 내 마음에 너를 담아 햇살이 비추는 날에 너와 함께 걷고 싶어");

		String fileName = albumImageUploadService.generateFileName("covers", ".png"); // 포맷을 PNG로 가정
		String base64Image = albumImageUploadService.parseAiCoverImage(imageResult);

		return new String[] {base64Image, fileName};
	}

	private Mono<String> requestImageGeneration(String prompt) {

		String enhancedPrompt = String.format("%s. This is the subject of the picture you want." +
						" If there is a request for a specific celebrity or player on the topic, it should not come out." +
						" If there are too many objects, it will be distracting, so please draw it so that it won't." +
						" Please review if there is any awkwardness and if there is any awkwardness, please draw it again with great effort!",
				prompt);

		// API 요청
		Mono<String> result = this.webClient.post()
				.uri("/images/generations")
				.contentType(MediaType.APPLICATION_JSON)
				.bodyValue(String.format(""" 
						{
						  "prompt": "%s",
						  "model": "dall-e-3",
						  "n": 1,
						  "quality": "standard",
						  "response_format": "b64_json",
						  "size": "1024x1024",
						  "style": "vivid"
						}
						""", enhancedPrompt.replace("\"", "\\\"")))
				.retrieve()
				.bodyToMono(String.class); // 문자열로 변환

		return result;
	}

}
