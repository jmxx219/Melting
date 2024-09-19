package com.dayangsung.melting.domain.originalsong.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.dayangsung.melting.domain.originalsong.dto.response.OriginalSongResponseDto;
import com.dayangsung.melting.domain.originalsong.dto.response.OriginalSongSearchResponseDto;
import com.dayangsung.melting.domain.originalsong.entity.OriginalSong;
import com.dayangsung.melting.domain.originalsong.repository.OriginalSongRepository;
import com.dayangsung.melting.global.common.service.AwsS3Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class OriginalSongService {

	private final OriginalSongRepository originalSongRepository;

	public List<OriginalSongSearchResponseDto> getSearchList(String keyword) {

		List<OriginalSong> originalSongList = originalSongRepository.findByKeyword(keyword);
		return originalSongList.stream()
			.map(OriginalSongSearchResponseDto::of)
			.collect(Collectors.toList());
	}

	public OriginalSongResponseDto getOriginalSongInfo(Long originalSongId) {
		OriginalSong originalSong = originalSongRepository.findById(originalSongId).orElseThrow(RuntimeException::new);
		return OriginalSongResponseDto.of(originalSong);
	}
}
