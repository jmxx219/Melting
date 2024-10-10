package com.dayangsung.melting.domain.song.dto.response;

import java.util.List;

import org.springframework.data.domain.Page;

import lombok.Builder;

@Builder
public record SongLikesPageResponseDto(
	List<SongLikesResponseDto> songLikesList,
	Boolean isLast,
	Integer pageNumber,
	Integer pageSize,
	Integer totalPages,
	Long totalElements,
	Integer numberOfElements
) {
	public static SongLikesPageResponseDto of(Page<SongLikesResponseDto> songLikesPage) {
		return SongLikesPageResponseDto.builder()
			.songLikesList(songLikesPage.getContent())
			.isLast(songLikesPage.isLast())
			.pageNumber(songLikesPage.getPageable().getPageNumber())
			.pageSize(songLikesPage.getPageable().getPageSize())
			.totalPages(songLikesPage.getTotalPages())
			.totalElements(songLikesPage.getTotalElements())
			.numberOfElements(songLikesPage.getNumberOfElements())
			.build();
	}
}
