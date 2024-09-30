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
	LocalDateTime createdAt
) {

	public static CommentResponseDto of(Comment comment, String writerProfileImage, String writerNickname) {
		return CommentResponseDto.builder()
			.commentId(comment.getId())
			.writerProfileImage(writerProfileImage)
			.writerNickname(writerNickname)
			.content(comment.getContent())
			.createdAt(comment.getCreatedAt())
			.build();
	}
}
