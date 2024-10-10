package com.dayangsung.melting.domain.song.dto.response;

import java.util.List;

import org.springframework.data.domain.Page;

import lombok.Builder;

@Builder
public record SongSearchPageResponseDto(
	List<SongSearchResponseDto> songSearchResponseDtoList,
	Boolean isLast,
	Integer pageNumber,
	Integer pageSize,
	Integer totalPages,
	Long totalElements,
	Integer numberOfElements
) {
	public static SongSearchPageResponseDto of(Page<SongSearchResponseDto> songPage) {
		return SongSearchPageResponseDto.builder()
			.songSearchResponseDtoList(songPage.getContent())
			.isLast(songPage.isLast())
			.pageNumber(songPage.getPageable().getPageNumber())
			.pageSize(songPage.getPageable().getPageSize())
			.totalPages(songPage.getTotalPages())
			.totalElements(songPage.getTotalElements())
			.numberOfElements(songPage.getNumberOfElements())
			.build();
	}
}
