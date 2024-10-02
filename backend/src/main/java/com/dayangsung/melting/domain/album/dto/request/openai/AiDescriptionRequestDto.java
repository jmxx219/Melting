package com.dayangsung.melting.domain.album.dto.request.openai;

import java.util.List;

import com.dayangsung.melting.domain.genre.entity.Genre;
import com.dayangsung.melting.domain.hashtag.entity.Hashtag;
import com.dayangsung.melting.domain.song.dto.SongResultDto;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record AiDescriptionRequestDto (
		List<SongResultDto> songs,
		List<Hashtag> hashtags,
		List<Genre> genres
) {
}