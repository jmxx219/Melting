package com.dayangsung.melting.domain.song.dto.response;

import com.dayangsung.melting.domain.song.entity.Song;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

import lombok.Builder;

@Builder
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record SongDetailsResponseDto(

	Long songId,
	String songTitle,
	String nickname,
	String artist,
	String albumCoverImage,
	Integer likedCount,
	String songUrl
) {
	public static SongDetailsResponseDto of(Song song, String albumCoverImage, Integer likedCount) {
		return SongDetailsResponseDto.builder()
			.songId(song.getId())
			.songTitle(song.getOriginalSong().getTitle())
			.nickname(song.getMember().getNickname())
			.artist(song.getOriginalSong().getArtist())
			.albumCoverImage(albumCoverImage)
			.likedCount(likedCount)
			.songUrl(song.getSongUrl())
			.build();
	}

}
