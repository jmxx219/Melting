package com.dayangsung.melting.domain.comment.dto.response;

import java.time.LocalDateTime;

import com.dayangsung.melting.domain.comment.entity.Comment;

import lombok.Builder;

@Builder
public record CommentResponseDto(
	Long commentId,
	String writerProfileImage,
	String writerNickname,
	String content,
	Boolean isMyComment,
	LocalDateTime createdAt
) {
	public static CommentResponseDto of(Comment comment, Boolean isMyComment) {
		return CommentResponseDto.builder()
			.commentId(comment.getId())
			.writerProfileImage(comment.getMember().getProfileImageUrl())
			.writerNickname(comment.getMember().getNickname())
			.content(comment.getContent())
			.isMyComment(isMyComment)
			.createdAt(comment.getCreatedAt())
			.build();
	}
}
