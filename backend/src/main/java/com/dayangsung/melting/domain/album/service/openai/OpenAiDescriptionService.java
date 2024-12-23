package com.dayangsung.melting.domain.album.service.openai;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.ExchangeStrategies;
import org.springframework.web.reactive.function.client.WebClient;

import com.dayangsung.melting.domain.album.dto.request.openai.AiDescriptionRequestDto;
import com.dayangsung.melting.domain.genre.entity.Genre;
import com.dayangsung.melting.domain.genre.service.GenreService;
import com.dayangsung.melting.domain.hashtag.entity.Hashtag;
import com.dayangsung.melting.domain.hashtag.service.HashtagService;
import com.dayangsung.melting.domain.song.entity.Song;
import com.dayangsung.melting.domain.song.service.SongService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import reactor.core.publisher.Mono;

@Service
public class OpenAiDescriptionService {

	private final OpenAiLyricsSummaryService openAiLyricsSummaryService;
	private final HashtagService hashtagService;
	private final GenreService genreService;
	private final SongService songService;
	private final WebClient webClient;
	private final ObjectMapper jacksonObjectMapper;

	static final String AUTHORIZATION = "Authorization";
	static final String BEARER = "Bearer ";

	public OpenAiDescriptionService(@Value("${openai.api-key}") String openAiApiKey, SongService songService,
			HashtagService hashtagService, OpenAiLyricsSummaryService openAiLyricsSummaryService,
			GenreService genreService, ObjectMapper jacksonObjectMapper) {
		this.openAiLyricsSummaryService = openAiLyricsSummaryService;
		this.hashtagService = hashtagService;
		this.genreService = genreService;
		this.songService = songService;
		this.webClient = WebClient.builder()
				.exchangeStrategies(ExchangeStrategies.builder()
						.codecs(configurer -> configurer.defaultCodecs().maxInMemorySize(10 * 1024 * 1024))
						.build())
				.baseUrl("https://api.openai.com/v1")
				.defaultHeader(AUTHORIZATION, BEARER + openAiApiKey)
				.build();
		this.jacksonObjectMapper = jacksonObjectMapper;
	}

	public String createAiDescription(AiDescriptionRequestDto aiDescriptionRequestDto) throws JsonProcessingException {
		StringBuilder result = new StringBuilder();

		List<Song> songList = songService.idListToSongList(aiDescriptionRequestDto.songs());
		List<String> lyricsList = songList.stream()
				.map(song -> song.getOriginalSong().getLyrics())
				.toList();

		Mono<String> summarizedLyrics = openAiLyricsSummaryService.summarizeLyrics(lyricsList);
		String lyrics = jsonParsing(summarizedLyrics.block());
		result.append(lyrics);

		List<String> hashtagList = hashtagService.contentListToHashtagList(aiDescriptionRequestDto.hashtags()).stream()
				.map(Hashtag::getContent)
				.toList();
		result.append(hashtagList).append(' ');

		List<String> genreList = genreService.contentListToGenreList(aiDescriptionRequestDto.genres()).stream()
				.map(Genre::getContent)
				.toList();
		result.append(genreList);

		Mono<String> descriptionResult = requestAlbumDescriptionGeneration(aiDescriptionRequestDto.albumName(),
				result.toString());
		return jsonParsing(descriptionResult.block());
	}

	private String jsonParsing(String jsonString) throws JsonProcessingException {
		JsonNode rootNode = jacksonObjectMapper.readTree(jsonString);
		return rootNode.path("choices")
				.get(0)
				.path("message")
				.path("content")
				.asText();
	}


	private Mono<String> requestAlbumDescriptionGeneration(String albumName, String summarizedLyrics) {
		String prompt = String.format("Do not listing the lyrics, keywords, and genres."
						+ "Please integrate them smoothly into the description."
						+ "Do not use the phrase 'the album' in the description, but mention the album name %s directly."
						+ "The owner of this album is the user, so it should be referred to as the artist, and the name of the original singer should not be mentioned."
						+ "Create a detailed album description (up to 800 characters) based on these summarized lyrics, keyword and genres. Please answer in Korean. : %s"
				, albumName, summarizedLyrics);

		Map<String, Object> bodyValue = Map.of(
				"model", "gpt-3.5-turbo",
				"messages", List.of(
						Map.of("role", "system", "content", "You are a helpful assistant."),
						Map.of("role", "user", "content", prompt)
				),
				"temperature", 0.7
		);

		return this.webClient.post()
				.uri("/chat/completions")
				.contentType(MediaType.APPLICATION_JSON)
				.bodyValue(bodyValue)
				.retrieve() // 응답을 받아옴
				.onStatus(HttpStatus.BAD_REQUEST::equals, clientResponse -> clientResponse.bodyToMono(String.class)
						.flatMap(errorBody -> Mono.error(new RuntimeException("API Error: " + errorBody))))
				.bodyToMono(String.class);
	}
}