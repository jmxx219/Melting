package com.dayangsung.melting.domain.genre.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dayangsung.melting.domain.album.entity.Album;
import com.dayangsung.melting.domain.genre.dto.response.GenreResponseDto;
import com.dayangsung.melting.domain.genre.entity.AlbumGenre;
import com.dayangsung.melting.domain.genre.entity.Genre;
import com.dayangsung.melting.domain.genre.repository.AlbumGenreRepository;
import com.dayangsung.melting.domain.genre.repository.GenreRepository;
import com.dayangsung.melting.global.common.enums.ErrorMessage;
import com.dayangsung.melting.global.exception.BusinessException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class GenreService {

	private final GenreRepository genreRepository;
	private final AlbumGenreRepository albumGenreRepository;

	@Transactional(readOnly = true)
	public List<GenreResponseDto> findAll() {
		return genreRepository.findAll().stream()
			.map(GenreResponseDto::of)
			.toList();
	}

	@Transactional(readOnly = true)
	public List<Genre> contentListToGenreList(List<String> idList) {
		return idList.stream().map(content -> genreRepository.findByContent(content)
			.orElseThrow(() -> new BusinessException(ErrorMessage.GENRE_NOT_FOUND))).toList();
	}

	@Transactional
	public void addAlbumGenre(Album album, String content) {
		Genre genre = genreRepository.findByContent(content)
			.orElseThrow(() -> new BusinessException(ErrorMessage.GENRE_NOT_FOUND));
		AlbumGenre albumGenre = AlbumGenre.builder().album(album).genre(genre).build();
		albumGenre = albumGenreRepository.save(albumGenre);
		album.addGenre(albumGenre);
	}
}
