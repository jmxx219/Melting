package com.dayangsung.melting.domain.song.service;

import org.springframework.stereotype.Service;

import com.dayangsung.melting.domain.albumsong.repository.AlbumSongRepository;
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
	private final AlbumSongRepository albumSongRepository;

	public SongDetailResponseDto getSongDetail(Long songId) {
		Song song = songRepository.findById(songId).orElseThrow(RuntimeException::new);
		String albumImageUrl = albumSongRepository.findLatestPublicAlbumCoverImageBySong(song)
			.orElse("http://example.com/image.jpg");
		//Todo : 기본 커버 이미지 추가
		return SongDetailResponseDto.of(song, albumImageUrl);
	}
}
