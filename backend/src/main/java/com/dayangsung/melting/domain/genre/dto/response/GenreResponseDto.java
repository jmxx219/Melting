package com.dayangsung.melting.domain.genre.dto.response;

import com.dayangsung.melting.domain.genre.entity.Genre;

import lombok.Builder;

@Builder
public record GenreResponseDto (
	Long id,
	String content
) {
	public static GenreResponseDto of(Genre genre) {
		return GenreResponseDto.builder()
				.id(genre.getId())
				.content(genre.getContent())
				.build();
	}
}
