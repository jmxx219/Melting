package com.dayangsung.melting.domain.originalsong.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.dayangsung.melting.domain.originalsong.dto.response.OriginalSongResponseDto;
import com.dayangsung.melting.domain.originalsong.dto.response.OriginalSongSearchPageResponseDto;
import com.dayangsung.melting.domain.originalsong.dto.response.OriginalSongSearchResponseDto;
import com.dayangsung.melting.domain.originalsong.entity.OriginalSong;
import com.dayangsung.melting.domain.originalsong.repository.OriginalSongRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class OriginalSongService {

	private final OriginalSongRepository originalSongRepository;

	public OriginalSongSearchPageResponseDto getSearchPage(String keyword, int page, int size) {
		Pageable pageable = PageRequest.of(page, size);
		Page<OriginalSongSearchResponseDto> originalSongPage =
			originalSongRepository.findByKeyword(keyword, pageable).map(OriginalSongSearchResponseDto::of);
		return OriginalSongSearchPageResponseDto.of(originalSongPage);
	}

	public OriginalSongResponseDto getOriginalSongInfo(Long originalSongId) {
		OriginalSong originalSong = originalSongRepository.findById(originalSongId).orElseThrow(RuntimeException::new);
		return OriginalSongResponseDto.of(originalSong);
	}
}
