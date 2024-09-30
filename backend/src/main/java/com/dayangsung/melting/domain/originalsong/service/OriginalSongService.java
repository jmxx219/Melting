package com.dayangsung.melting.domain.originalsong.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.dayangsung.melting.domain.originalsong.dto.response.OriginalSongResponseDto;
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

	public Page<OriginalSongSearchResponseDto> getSearchPage(String keyword, int page, int size) {
		Pageable pageable = PageRequest.of(page, size);
		Page<OriginalSong> originalSongPage = originalSongRepository.findByKeyword(keyword, pageable);
		return originalSongPage.map(OriginalSongSearchResponseDto::of);
	}

	public OriginalSongResponseDto getOriginalSongInfo(Long originalSongId) {
		OriginalSong originalSong = originalSongRepository.findById(originalSongId).orElseThrow(RuntimeException::new);
		return OriginalSongResponseDto.of(originalSong);
	}
}
