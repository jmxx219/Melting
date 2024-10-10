package com.dayangsung.melting.domain.hashtag.dto.response;

import java.util.List;

import org.springframework.data.domain.Page;

import com.dayangsung.melting.domain.hashtag.entity.HashtagDocument;

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

	public static HashtagPageResponseDto from(Page<HashtagDocument> hashtagDocumentPage) {
		List<HashtagResponseDto> hashtagDtos = hashtagDocumentPage
			.stream()
			.map(HashtagResponseDto::of)
			.toList();

		return HashtagPageResponseDto.builder()
			.hashtags(hashtagDtos)
			.isLast(hashtagDocumentPage.isLast())
			.pageNumber(hashtagDocumentPage.getNumber())
			.pageSize(hashtagDocumentPage.getSize())
			.totalPages(hashtagDocumentPage.getTotalPages())
			.totalElements(hashtagDocumentPage.getTotalElements())
			.numberOfElements(hashtagDocumentPage.getNumberOfElements())
			.build();
	}
}
