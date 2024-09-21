package com.dayangsung.melting.domain.album.dto.request;

import java.util.List;

import com.dayangsung.melting.domain.genre.entity.Genre;
import com.dayangsung.melting.domain.hashtag.entity.Hashtag;
import com.dayangsung.melting.domain.song.entity.Song;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

// TODO: 수정 필요
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record AlbumCreateRequestDto(
	String albumName,
	String albumCoverImage,
	String albumDescription,
	List<Song> songs,
	List<Hashtag> hashtags,
	List<Genre> genres
) {
}