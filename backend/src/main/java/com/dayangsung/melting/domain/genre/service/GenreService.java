package com.dayangsung.melting.domain.genre.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dayangsung.melting.domain.genre.dto.response.GenreResponseDto;
import com.dayangsung.melting.domain.genre.entity.Genre;
import com.dayangsung.melting.domain.genre.repository.GenreRepository;
import com.dayangsung.melting.global.common.enums.ErrorMessage;
import com.dayangsung.melting.global.exception.BusinessException;

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

	@Transactional(readOnly = true)
	public List<Genre> idListToGenreList(List<Long> idList) {
		return idList.stream().map(genreId -> genreRepository.findById(genreId)
			.orElseThrow(() -> new BusinessException(ErrorMessage.GENRE_NOT_FOUND))).toList();
	}
}
