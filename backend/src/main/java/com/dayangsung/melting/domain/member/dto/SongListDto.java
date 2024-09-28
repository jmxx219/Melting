package com.dayangsung.melting.domain.member.dto;

import java.util.List;

import com.dayangsung.melting.domain.originalsong.entity.OriginalSong;
import com.dayangsung.melting.domain.song.dto.SongMypageDto;

import lombok.Builder;

@Builder
public record SongListDto(
	Long originalSongId,
	String songTitle,
	String artist,
	List<SongMypageDto> songList
	
) {
	public static SongListDto of(OriginalSong originalSong, List<SongMypageDto> songList) {
		return SongListDto.builder()
			.originalSongId(originalSong.getId())
			.songTitle(originalSong.getTitle())
			.artist(originalSong.getArtist())
			.songList(songList)
			.build();
	}
}
