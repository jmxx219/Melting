package com.dayangsung.melting.domain.album.dto.request;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

public record AlbumCreateRequestDto(
	String albumName,
	String albumDescription,
	List<Long> songs,
	Long titleSongId,
	List<Long> genres,
	List<String> hashtags,
	MultipartFile albumCoverImage
) {
}
