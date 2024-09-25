package com.dayangsung.melting.domain.member.dto.response;

import java.util.List;

import com.dayangsung.melting.domain.originalsong.entity.OriginalSong;
import com.dayangsung.melting.domain.song.dto.SongMypageDto;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

import lombok.Builder;

@Builder
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record MemberSongResponseDto(
	String songTitle,
	String artist,
	List<SongMypageDto> songList
) {
	public static MemberSongResponseDto of(OriginalSong originalSong, List<SongMypageDto> songList) {
		return MemberSongResponseDto.builder()
			.songTitle(originalSong.getTitle())
			.artist(originalSong.getArtist())
			.songList(songList)
			.build();
	}
}
