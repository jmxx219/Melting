package com.dayangsung.melting.domain.comment.dto.response;

import java.util.List;

import org.springframework.data.domain.Page;

import lombok.Builder;

@Builder
public record CommentPageResponseDto(
	List<CommentResponseDto> commentPage,
	Boolean isLast,
	Integer pageNumber,
	Integer pageSize,
	Integer totalPages,
	Long totalElements,
	Integer numberOfElements
) {
	public static CommentPageResponseDto of(Page<CommentResponseDto> commentResponseDtoPage) {
		return CommentPageResponseDto.builder()
			.commentPage(commentResponseDtoPage.getContent())
			.isLast(commentResponseDtoPage.isLast())
			.pageNumber(commentResponseDtoPage.getPageable().getPageNumber())
			.pageSize(commentResponseDtoPage.getPageable().getPageSize())
			.totalPages(commentResponseDtoPage.getTotalPages())
			.totalElements(commentResponseDtoPage.getTotalElements())
			.numberOfElements(commentResponseDtoPage.getNumberOfElements())
			.build();
	}
}
