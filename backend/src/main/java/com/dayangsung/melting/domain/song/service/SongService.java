package com.dayangsung.melting.domain.song.service;

import org.springframework.stereotype.Service;

import com.dayangsung.melting.domain.albumsong.repository.AlbumSongRepository;
import com.dayangsung.melting.domain.song.dto.response.SongDetailResponseDto;
import com.dayangsung.melting.domain.song.entity.Song;
import com.dayangsung.melting.domain.song.repository.SongRepository;
import com.dayangsung.melting.global.common.service.AwsS3Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class SongService {

	private final SongRepository songRepository;
	private final AlbumSongRepository albumSongRepository;
	private final AwsS3Service awsS3Service;

	public SongDetailResponseDto getSongDetail(Long songId) {
		Song song = songRepository.findById(songId).orElseThrow(RuntimeException::new);
		String albumImageUrl = albumSongRepository.findLatestPublicAlbumCoverImageBySong(song)
			.orElse(awsS3Service.getDefaultProfileImageUrl());
		//Todo: 스트리밍수 redis 추가 필요
		return SongDetailResponseDto.of(song, albumImageUrl);
	}
}
