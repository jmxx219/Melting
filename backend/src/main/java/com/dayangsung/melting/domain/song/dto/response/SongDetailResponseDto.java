package com.dayangsung.melting.domain.song.dto.response;

import com.dayangsung.melting.domain.song.entity.Song;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

import lombok.Builder;

@Builder
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record SongDetailResponseDto(
	Long songId,
	String songTitle,
	String nickname,
	String artist,
	String albumImageUrl,
	Long likedCount,
	String songPath
) {
	public static SongDetailResponseDto of(Song song, String albumImageUrl) {
		return SongDetailResponseDto.builder()
			.songId(song.getId())
			.songTitle(song.getOriginalSong().getTitle())
			.nickname(song.getMember().getNickname())
			.artist(song.getOriginalSong().getSongArtist())
			.albumImageUrl(albumImageUrl)
			.likedCount(song.getLikedCount())
			.songPath(song.getFile().getFilePath())
			.build();
	}

}
