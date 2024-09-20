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
	String coverImageUrl,
	Long likedCount,
	String songUrl
) {
	public static SongDetailResponseDto of(Song song, String coverImageUrl) {
		return SongDetailResponseDto.builder()
			.songId(song.getId())
			.songTitle(song.getOriginalSong().getTitle())
			.nickname(song.getMember().getNickname())
			.artist(song.getOriginalSong().getArtist())
			.coverImageUrl(coverImageUrl)
			.likedCount(song.getLikedCount())
			.songUrl(song.getSongUrl())
			.build();
	}

}
