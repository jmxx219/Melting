package com.dayangsung.melting.domain.song.service;

import org.springframework.stereotype.Service;

import com.dayangsung.melting.domain.song.dto.response.SongDetailResponseDto;
import com.dayangsung.melting.domain.song.entity.Song;
import com.dayangsung.melting.domain.song.repository.SongRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class SongService {

	private final SongRepository songRepository;

	public SongDetailResponseDto getSongDetail(Long songId) {
		Song song = songRepository.findById(songId).orElseThrow(RuntimeException::new);
		//Todo : album 수록곡에 따른 커버 이미지 불러오기
		String albumImageUrl = "http://example.com/image.jpg";
		return SongDetailResponseDto.of(song, albumImageUrl);
	}
}
