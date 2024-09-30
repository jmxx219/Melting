package com.dayangsung.melting.domain.genre.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dayangsung.melting.domain.genre.dto.response.GenreResponseDto;
import com.dayangsung.melting.domain.genre.entity.Genre;
import com.dayangsung.melting.domain.genre.repository.GenreRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class GenreService {

	private final GenreRepository genreRepository;

	@Transactional(readOnly = true)
	public List<GenreResponseDto> getAllGenres() {
		List<Genre> genres = genreRepository.findAll();
		return genres.stream()
				.map(GenreResponseDto::of)
				.collect(Collectors.toList());
	}

}
