package com.dayangsung.melting.domain.hashtag.dto.response;

import java.util.List;

import org.springframework.data.domain.Page;

import lombok.Builder;

@Builder
public record HashtagPageResponseDto(
	List<HashtagResponseDto> hashtags,
	Boolean isLast,
	Integer pageNumber,
	Integer pageSize,
	Integer totalPages,
	Long totalElements,
	Integer numberOfElements
) {
	public static HashtagPageResponseDto of(Page<HashtagResponseDto> hashtagPage) {
		return HashtagPageResponseDto.builder()
			.hashtags(hashtagPage.getContent())
			.isLast(hashtagPage.isLast())
			.pageNumber(hashtagPage.getPageable().getPageNumber())
			.pageSize(hashtagPage.getPageable().getPageSize())
			.totalPages(hashtagPage.getTotalPages())
			.totalElements(hashtagPage.getTotalElements())
			.numberOfElements(hashtagPage.getNumberOfElements())
			.build();
	}
}
