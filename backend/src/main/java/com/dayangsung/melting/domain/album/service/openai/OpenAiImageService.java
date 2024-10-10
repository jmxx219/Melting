package com.dayangsung.melting.domain.album.service.openai;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.ExchangeStrategies;
import org.springframework.web.reactive.function.client.WebClient;

import com.dayangsung.melting.domain.album.service.AlbumCoverImageService;
import com.dayangsung.melting.domain.song.entity.Song;
import com.dayangsung.melting.domain.song.service.SongService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import reactor.core.publisher.Mono;

@Service
public class OpenAiImageService {

	private final OpenAiLyricsSummaryService openAiLyricsSummaryService;
	private final AlbumCoverImageService albumCoverImageService;
	private final ObjectMapper jacksonObjectMapper;
	private final SongService songService;
	private final WebClient webClient;

	static final String AUTHORIZATION = "Authorization";
	static final String BEARER = "Bearer ";

	public OpenAiImageService(@Value("${openai.api-key}") String openAiApiKey,
			@Lazy AlbumCoverImageService albumCoverImageService, OpenAiLyricsSummaryService openAiLyricsSummaryService,
			SongService songService, ObjectMapper jacksonObjectMapper) {
		this.albumCoverImageService = albumCoverImageService;
		this.openAiLyricsSummaryService = openAiLyricsSummaryService;
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

	public String[] createAiCoverImage(List<Long> songs) throws JsonProcessingException {
		List<Song> songList = songService.idListToSongList(songs);
		List<String> lyricsList = songList.stream()
				.map(song -> song.getOriginalSong().getLyrics().replace('\n', ' '))
				.toList();

		Mono<String> lyricsResult = openAiLyricsSummaryService.summarizeLyrics(lyricsList);
		String content = jsonParsing(lyricsResult.block());
		Mono<String> imageResult = requestImageGeneration(content);

		String fileName = albumCoverImageService.generateFileName("image/generated_album_cover", ".png"); // 포맷을 PNG로 가정
		String base64Image = albumCoverImageService.parseAiCoverImage(imageResult);

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
						" Please don't be too profound. Draw it in an anime style." +
						" If there are too many objects, it will be distracting, so please draw it in a simple way." +
						" Please review if there is any awkwardness and if there is any awkwardness, please draw it again with great effort!",
				prompt);

		Map<String, Object> bodyValue = Map.of(
				"prompt", enhancedPrompt,
				"model", "dall-e-3",
				"n", 1,
				"quality", "standard",
				"response_format", "b64_json",
				"size", "1024x1024",
				"style", "vivid"
		);

		return this.webClient.post()
				.uri("/images/generations")
				.contentType(MediaType.APPLICATION_JSON)
				.bodyValue(bodyValue)
				.retrieve()
				.onStatus(HttpStatus.BAD_REQUEST::equals, clientResponse -> clientResponse.bodyToMono(String.class)
						.flatMap(errorBody -> Mono.error(new RuntimeException("API Error: " + errorBody))))
				.bodyToMono(String.class);
	}

}