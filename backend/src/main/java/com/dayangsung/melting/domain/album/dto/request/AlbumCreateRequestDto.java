package com.dayangsung.melting.domain.album.dto.request;

import java.util.List;

import com.dayangsung.melting.domain.genre.entity.Genre;
import com.dayangsung.melting.domain.hashtag.entity.Hashtag;
import com.dayangsung.melting.domain.song.entity.Song;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record AlbumCreateRequestDto(
		@NotNull String albumName,
		String albumCoverImage,
		String albumDescription,
		@NotEmpty List<Song> songs,
		List<Hashtag> hashtags,
		List<Genre> genres
) {
}