package com.dayangsung.melting.domain.album.dto.response;

import java.util.List;

import org.springframework.data.domain.Page;

import lombok.Builder;

@Builder
public record AlbumRankingPageResponseDto(
	List<AlbumRankingResponseDto> albums,
	Boolean isLast,
	Integer pageNumber,
	Integer pageSize,
	Integer totalPages,
	Long totalElements,
	Integer numberOfElements
) {
	public static AlbumRankingPageResponseDto of(Page<AlbumRankingResponseDto> albumPage) {
		return AlbumRankingPageResponseDto.builder()
			.albums(albumPage.getContent())
			.isLast(albumPage.isLast())
			.pageNumber(albumPage.getPageable().getPageNumber())
			.pageSize(albumPage.getPageable().getPageSize())
			.totalPages(albumPage.getTotalPages())
			.totalElements(albumPage.getTotalElements())
			.numberOfElements(albumPage.getNumberOfElements())
			.build();
	}
}
