package com.dayangsung.melting.domain.originalsong.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.dayangsung.melting.domain.originalsong.dto.response.OriginalSongResponseDto;
import com.dayangsung.melting.domain.originalsong.entity.OriginalSong;
import com.dayangsung.melting.domain.originalsong.repository.OriginalSongRepository;
import com.dayangsung.melting.global.entity.AudioFile;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class OriginalSongService {

	private final OriginalSongRepository originalSongRepository;

	public List<OriginalSongResponseDto> getSearchList(String keyword) {

		List<OriginalSong> originalSongList = originalSongRepository.findByKeyword(keyword);
		return originalSongList.stream()
			.map(OriginalSongResponseDto::of)
			.collect(Collectors.toList());
	}

	public String getLyrics(Long originalSongId) {

		OriginalSong originalSong = originalSongRepository.findById(originalSongId).orElseThrow(RuntimeException::new);
		return originalSong.getLyrics();
	}

	public String getMrFilePath(Long originalSongId) {

		OriginalSong originalSong = originalSongRepository.findById(originalSongId).orElseThrow(RuntimeException::new);
		AudioFile mr = originalSong.getMr();
		return mr.getAudioFileFullPath();
	}
}
