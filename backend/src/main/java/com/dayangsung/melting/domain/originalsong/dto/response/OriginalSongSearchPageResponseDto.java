package com.dayangsung.melting.domain.originalsong.dto.response;

import java.util.List;

import org.springframework.data.domain.Page;

import lombok.Builder;

@Builder
public record OriginalSongSearchPageResponseDto(
	List<OriginalSongSearchResponseDto> originalSongPage,
	Boolean isLast,
	Integer pageNumber,
	Integer pageSize,
	Integer totalPages,
	Long totalElements,
	Integer numberOfElements
) {
	public static OriginalSongSearchPageResponseDto of(Page<OriginalSongSearchResponseDto> originalSongPage) {
		return OriginalSongSearchPageResponseDto.builder()
			.originalSongPage(originalSongPage.getContent())
			.isLast(originalSongPage.isLast())
			.pageNumber(originalSongPage.getPageable().getPageNumber())
			.pageSize(originalSongPage.getPageable().getPageSize())
			.totalPages(originalSongPage.getTotalPages())
			.totalElements(originalSongPage.getTotalElements())
			.numberOfElements(originalSongPage.getNumberOfElements())
			.build();
	}
}
