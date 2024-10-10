package com.dayangsung.melting.domain.song.dto.response;

import com.dayangsung.melting.domain.song.entity.Song;

import lombok.Builder;

@Builder
public record SongDetailsResponseDto(
	Long songId,
	String songTitle,
	String nickname,
	String artist,
	String albumCoverImageUrl,
	Boolean isLiked,
	Boolean isTitle,
	Integer likedCount,
	String songUrl,
	String lyrics,
	Integer lengthInSeconds
) {
	public static SongDetailsResponseDto of(Song song, String albumCoverImageUrl, Boolean isLiked, Integer likedCount) {
		return SongDetailsResponseDto.builder()
			.songId(song.getId())
			.songTitle(song.getOriginalSong().getTitle())
			.nickname(song.getMember().getNickname())
			.artist(song.getOriginalSong().getArtist())
			.albumCoverImageUrl(albumCoverImageUrl)
			.isLiked(isLiked)
			.isTitle(song.getIsTitle())
			.likedCount(likedCount)
			.songUrl(song.getSongUrl())
			.lyrics(song.getOriginalSong().getLyrics())
			.lengthInSeconds(song.getOriginalSong().getLengthInSeconds())
			.build();
	}

}
