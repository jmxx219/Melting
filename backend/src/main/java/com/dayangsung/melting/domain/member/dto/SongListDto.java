package com.dayangsung.melting.domain.member.dto;

import java.util.List;

import com.dayangsung.melting.domain.originalsong.entity.OriginalSong;
import com.dayangsung.melting.domain.song.dto.SongMyResponseDto;

import lombok.Builder;

@Builder
public record SongListDto(
	Long originalSongId,
	String songTitle,
	String artist,
	List<SongMyResponseDto> songList

) {
	public static SongListDto of(OriginalSong originalSong, List<SongMyResponseDto> songList) {
		return SongListDto.builder()
			.originalSongId(originalSong.getId())
			.songTitle(originalSong.getTitle())
			.artist(originalSong.getArtist())
			.songList(songList)
			.build();
	}
}
