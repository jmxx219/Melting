package com.dayangsung.melting.domain.album.dto.request;

import java.util.List;

import com.dayangsung.melting.domain.album.enums.AlbumCategory;
import com.dayangsung.melting.domain.song.entity.Song;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record AlbumCreateRequestDto(
	String albumName,
	AlbumCategory category,
	List<String> genres,
	String albumDescription,
	String albumCoverImage,
	List<Song> songs
) {
}