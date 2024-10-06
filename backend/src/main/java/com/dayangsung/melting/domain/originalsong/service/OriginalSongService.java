package com.dayangsung.melting.domain.originalsong.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dayangsung.melting.domain.originalsong.dto.response.OriginalSongResponseDto;
import com.dayangsung.melting.domain.originalsong.dto.response.OriginalSongSearchPageResponseDto;
import com.dayangsung.melting.domain.originalsong.dto.response.OriginalSongSearchResponseDto;
import com.dayangsung.melting.domain.originalsong.entity.OriginalSong;
import com.dayangsung.melting.domain.originalsong.repository.OriginalSongRepository;
import com.dayangsung.melting.global.common.enums.ErrorMessage;
import com.dayangsung.melting.global.exception.BusinessException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class OriginalSongService {

	private final OriginalSongRepository originalSongRepository;

	@Transactional
	public OriginalSongSearchPageResponseDto getSearchPage(String keyword, int page, int size) {
		Pageable pageable = PageRequest.of(page, size);
		Page<OriginalSongSearchResponseDto> originalSongPage;
		if (keyword == null || keyword.isEmpty()) {
			originalSongPage = originalSongRepository.findAllOrderByArtistAsc(pageable)
				.map(OriginalSongSearchResponseDto::of);
		} else {
			originalSongPage = originalSongRepository.findByKeyword(keyword, pageable)
				.map(OriginalSongSearchResponseDto::of);
		}
		return OriginalSongSearchPageResponseDto.of(originalSongPage);
	}

	@Transactional
	public OriginalSongResponseDto getOriginalSongInfo(Long originalSongId) {
		OriginalSong originalSong = originalSongRepository.findById(originalSongId)
			.orElseThrow(() -> new BusinessException(ErrorMessage.ORIGINAL_SONG_NOT_FOUND));
		return OriginalSongResponseDto.of(originalSong);
	}
}
