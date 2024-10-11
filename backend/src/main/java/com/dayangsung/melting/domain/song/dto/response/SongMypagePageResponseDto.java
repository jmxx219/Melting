package com.dayangsung.melting.domain.song.dto.response;

import java.util.List;

import com.dayangsung.melting.domain.song.dto.SongListDto;

import lombok.Builder;

@Builder
public record SongMypagePageResponseDto(
	List<SongListDto> mySongList,
	boolean isPossibleAiCover,
	Boolean isLast,
	Integer pageNumber,
	Integer pageSize,
	Integer totalPages,
	Long totalElements,
	Integer numberOfElements
) {
	public static SongMypagePageResponseDto of(
		List<SongListDto> pagedSongList,
		boolean isPossibleAiCover,
		Boolean isLast,
		Integer pageNumber,
		Integer pageSize,
		Integer totalPages,
		Long totalElements,
		Integer numberOfElements
	) {
		return SongMypagePageResponseDto.builder()
			.mySongList(pagedSongList)
			.isPossibleAiCover(isPossibleAiCover)
			.isLast(isLast)
			.pageNumber(pageNumber)
			.pageSize(pageSize)
			.totalPages(totalPages)
			.totalElements(totalElements)
			.numberOfElements(numberOfElements)
			.build();
	}
}
