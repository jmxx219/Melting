package com.dayangsung.melting.domain.member.dto.response;

import com.dayangsung.melting.domain.song.entity.Song;
import com.dayangsung.melting.domain.song.enums.SongType;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Builder;

@Builder
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record MemberSongResponseDto(
	Long songId,
	String songTitle,
	String artist,
	String albumCoverImage,
	Integer likedCount,
	@Enumerated(EnumType.STRING)
	SongType songType
) {
	public static MemberSongResponseDto of(Song song, String albumCoverImage, Integer likedCount) {
		return MemberSongResponseDto.builder()
			.songId(song.getId())
			.songTitle(song.getOriginalSong().getTitle())
			.artist(song.getOriginalSong().getArtist())
			.albumCoverImage(albumCoverImage)
			.likedCount(likedCount)
			.build();
	}
}
