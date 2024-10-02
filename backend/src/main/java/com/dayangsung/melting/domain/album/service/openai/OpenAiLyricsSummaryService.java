package com.dayangsung.melting.domain.album.service.openai;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.dayangsung.melting.domain.originalsong.dto.response.OriginalSongAiResponseDto;

import reactor.core.publisher.Mono;

@Service
public class OpenAiLyricsSummaryService {

	private final WebClient webClient;

	public OpenAiLyricsSummaryService(@Value("${openai.api-key}") String openAiApiKey,
			WebClient.Builder webClientBuilder) {
		this.webClient = webClientBuilder
				.baseUrl("https://api.openai.com/v1")
				.defaultHeader("Authorization", "Bearer " + openAiApiKey)
				.build();
	}

	// 가사 요약
	public Mono<String> summarizeLyrics(List<OriginalSongAiResponseDto> originalSongs) {
		String lyrics = extractLyrics(originalSongs);
		String prompt = String.format("Summarize the following song lyrics in a concise way: %s", lyrics);

		// API 요청
		Mono<String> result = this.webClient.post()
				.uri("/chat/completions")
				.contentType(MediaType.APPLICATION_JSON)
				.bodyValue(String.format("""
						{
						    "model": "gpt-3.5-turbo",
						    "messages": [
						        {"role": "system", "content": "You are a helpful assistant."},
						        {"role": "user", "content": "%s"}
						    ],
						    "temperature": 0.7
						}
						""", prompt.replace("\"", "\\\"")))
				.retrieve() // 응답 받아옴
				.bodyToMono(String.class); // 문자열로 변환
		return result;
	}

	private String extractLyrics(List<OriginalSongAiResponseDto> originalSongs) {
		StringBuilder lyricsBuilder = new StringBuilder();
		for (OriginalSongAiResponseDto originalSong : originalSongs) {
			String lyrics = originalSong.lyrics();
			lyricsBuilder.append(lyrics).append(' ');
		}
		return lyricsBuilder.toString().replace('\n', ' ').trim();
	}
}