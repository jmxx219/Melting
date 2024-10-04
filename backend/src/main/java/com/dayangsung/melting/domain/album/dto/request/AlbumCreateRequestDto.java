package com.dayangsung.melting.domain.album.dto.request;

import java.util.List;

public record AlbumCreateRequestDto(
	String albumName,
	String albumDescription,
	List<Long> songs,
	Long titleSongId,
	List<String> genres,
	List<String> hashtags
) {
}
