package com.dayangsung.melting.domain.album.service.openai;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.dayangsung.melting.domain.song.entity.Song;

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
	public Mono<String> summarizeLyrics(List<Song> songs) {
		String lyrics = extractLyrics(songs);
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

	// 가사 추출
	private String extractLyrics(List<Song> songs) {
		StringBuilder lyricsBuilder = new StringBuilder();

		for (Song song : songs) {
			if (song.getOriginalSong() != null) { // OriginalSong null 체크
				String lyrics = song.getOriginalSong().getLyrics();
				if (lyrics != null && !lyrics.isEmpty()) { // 가사 null 및 빈 문자열 체크
					lyricsBuilder.append(lyrics).append(" ");
				}
			}
		}

		return lyricsBuilder.toString().trim();
	}
}
