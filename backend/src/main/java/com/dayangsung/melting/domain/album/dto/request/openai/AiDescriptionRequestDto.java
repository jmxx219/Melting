package com.dayangsung.melting.domain.album.dto.request.openai;

import java.util.List;

import com.dayangsung.melting.domain.genre.entity.Genre;
import com.dayangsung.melting.domain.hashtag.entity.Hashtag;
import com.dayangsung.melting.domain.song.dto.SongResultDto;

public record AiDescriptionRequestDto (
		List<SongResultDto> songs,
		List<Hashtag> hashtags,
		List<Genre> genres
) {
}