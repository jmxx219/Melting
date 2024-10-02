package com.dayangsung.melting.domain.album.service.openai;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.ExchangeStrategies;
import org.springframework.web.reactive.function.client.WebClient;

import com.dayangsung.melting.domain.album.service.AlbumImageUploadService;
import com.dayangsung.melting.domain.originalsong.dto.response.OriginalSongAiResponseDto;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import reactor.core.publisher.Mono;

@Service
public class OpenAiImageService {

	private final OpenAiLyricsSummaryService openAiLyricsSummaryService;
	private final AlbumImageUploadService albumImageUploadService;
	private final WebClient webClient;
	private final ObjectMapper jacksonObjectMapper;

	public OpenAiImageService(@Value("${openai.api-key}") String openAiApiKey,
			AlbumImageUploadService albumImageUploadService, OpenAiLyricsSummaryService openAiLyricsSummaryService,
			ObjectMapper jacksonObjectMapper) {
		this.albumImageUploadService = albumImageUploadService;
		this.openAiLyricsSummaryService = openAiLyricsSummaryService;
		this.webClient = WebClient.builder()
				.exchangeStrategies(ExchangeStrategies.builder()
						.codecs(configurer -> configurer.defaultCodecs().maxInMemorySize(10 * 1024 * 1024))
						.build())
				.baseUrl("https://api.openai.com/v1")
				.defaultHeader("Authorization", "Bearer " + openAiApiKey)
				.build();
		this.jacksonObjectMapper = jacksonObjectMapper;
	}

	public String[] createAiCoverImage(List<OriginalSongAiResponseDto> songs) throws JsonProcessingException {

		Mono<String> lyricsResult = openAiLyricsSummaryService.summarizeLyrics(songs);
		String blockedResult = lyricsResult.block();

		String content = jsonParsing(blockedResult);
		Mono<String> imageResult = requestImageGeneration(content);

		String fileName = albumImageUploadService.generateFileName("covers", ".png"); // 포맷을 PNG로 가정
		String base64Image = albumImageUploadService.parseAiCoverImage(imageResult);

		return new String[] {base64Image, fileName};
	}

	private String jsonParsing(String jsonString) throws JsonProcessingException {
		JsonNode rootNode = jacksonObjectMapper.readTree(jsonString);
		return rootNode.path("choices")
				.get(0)
				.path("message")
				.path("content")
				.asText();
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