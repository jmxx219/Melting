package com.dayangsung.melting.domain.song.dto.response;

import com.dayangsung.melting.domain.song.entity.Song;

import lombok.Builder;

@Builder
public record SongDetailsResponseDto(

	Long songId,
	String songTitle,
	String nickname,
	String artist,
	String albumCoverImage,
	boolean isLiked,
	Integer likedCount,
	String songUrl,
	String lyrics
) {
	public static SongDetailsResponseDto of(Song song, String albumCoverImage, boolean isLiked, Integer likedCount) {
		return SongDetailsResponseDto.builder()
			.songId(song.getId())
			.songTitle(song.getOriginalSong().getTitle())
			.nickname(song.getMember().getNickname())
			.artist(song.getOriginalSong().getArtist())
			.albumCoverImage(albumCoverImage)
			.isLiked(isLiked)
			.likedCount(likedCount)
			.songUrl(song.getSongUrl())
			.lyrics(song.getOriginalSong().getLyrics())
			.build();
	}

}