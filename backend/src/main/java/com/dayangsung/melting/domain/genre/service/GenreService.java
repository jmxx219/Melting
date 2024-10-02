package com.dayangsung.melting.domain.genre.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dayangsung.melting.domain.genre.dto.response.GenreResponseDto;
import com.dayangsung.melting.domain.genre.repository.GenreRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class GenreService {

	private final GenreRepository genreRepository;

	@Transactional(readOnly = true)
	public List<GenreResponseDto> findAll() {
		return genreRepository.findAll().stream()
				.map(GenreResponseDto::of)
				.toList();
	}

}
