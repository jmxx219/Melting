package com.dayangsung.melting.domain.album.service.openai;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.ExchangeStrategies;
import org.springframework.web.reactive.function.client.WebClient;

import com.dayangsung.melting.domain.album.dto.request.openai.AiCoverImageRequestDto;

import reactor.core.publisher.Mono;

@Service
public class OpenAiDescriptionService {

	private final OpenAiLyricsSummaryService openAiLyricsSummaryService;
	private final WebClient webClient;

	public OpenAiDescriptionService(@Value("${openai.api-key}") String openAiApiKey,
		OpenAiLyricsSummaryService openAiLyricsSummaryService) {
		this.openAiLyricsSummaryService = openAiLyricsSummaryService;
		this.webClient = WebClient.builder()
			.exchangeStrategies(ExchangeStrategies.builder()
				.codecs(configurer -> configurer.defaultCodecs().maxInMemorySize(10 * 1024 * 1024))
				.build())
			.baseUrl("https://api.openai.com/v1")
			.defaultHeader("Authorization", "Bearer " + openAiApiKey)
			.build();
	}

	public String createAlbumDescription(AiCoverImageRequestDto aiCoverImageRequestDto) {

		// 가사 요약
		Mono<String> lyricsResult = openAiLyricsSummaryService.summarizeLyrics(aiCoverImageRequestDto.songs());

		// 요약된 가사를 사용하여 앨범 소개 생성 요청
		Mono<String> descriptionResult = requestAlbumDescriptionGeneration(lyricsResult.block());

		return descriptionResult.block(); // 생성된 앨범 소개 반환
	}

	private Mono<String> requestAlbumDescriptionGeneration(String summarizedLyrics) {
		String prompt = String.format("Create a detailed album description based on these summarized lyrics: %s",
			summarizedLyrics);

		// OpenAI API에 앨범 소개 생성 요청
		Mono<String> result = this.webClient.post()
			.uri("/completions")
			.contentType(MediaType.APPLICATION_JSON)
			.bodyValue(String.format("""
				{
				  "prompt": "%s",
				  "model": "gpt-3.5-turbo",
				  "max_tokens": 200,
				  "temperature": 0.7
				}
				""", prompt.replace("\"", "\\\"")))
			.retrieve() // 응답을 받아옴
			.bodyToMono(String.class); // 문자열로 변환

		return result;
	}
}
