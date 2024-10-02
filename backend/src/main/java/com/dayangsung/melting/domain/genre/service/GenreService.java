package com.dayangsung.melting.domain.genre.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dayangsung.melting.domain.genre.dto.response.GenreResponseDto;
import com.dayangsung.melting.domain.genre.entity.Genre;
import com.dayangsung.melting.domain.genre.repository.GenreRepository;

import jakarta.persistence.Table;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class GenreService {

	private final GenreRepository genreRepository;

	@Transactional(readOnly = true)
	public List<GenreResponseDto> findAll() {
		List<Genre> result = genreRepository.findAll();
		List<GenreResponseDto> resultToDto = new ArrayList<>();
		for (Genre genre : result) {
			resultToDto.add(GenreResponseDto.of(genre));
		}
		return resultToDto;
	}
}
