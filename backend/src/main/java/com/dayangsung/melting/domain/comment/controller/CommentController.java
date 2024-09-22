package com.dayangsung.melting.domain.comment.controller;

import java.util.List;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dayangsung.melting.domain.auth.dto.CustomOAuth2User;
import com.dayangsung.melting.domain.comment.dto.request.CommentRequestDto;
import com.dayangsung.melting.domain.comment.dto.response.CommentResponseDto;
import com.dayangsung.melting.domain.comment.service.CommentService;
import com.dayangsung.melting.global.common.response.ApiResponse;

import lombok.RequiredArgsConstructor;

// TODO : 작성자만 수정 삭제 가능하게 메소드 시큐리티 적용
@RestController
@RequestMapping("/api/v1/albums/{albumId}/comments")
@RequiredArgsConstructor
public class CommentController {

	private final CommentService commentService;

	@GetMapping
	public ApiResponse<List<CommentResponseDto>> getAllComments(@PathVariable Long albumId) {
		List<CommentResponseDto> commentResponseDtoList = commentService.getAllComments(albumId);
		return ApiResponse.ok(commentResponseDtoList);
	}

	@PostMapping
	public ApiResponse<CommentResponseDto> writeComment(@PathVariable Long albumId,
		@AuthenticationPrincipal CustomOAuth2User customOAuth2User, @RequestBody CommentRequestDto commentRequestDto) {
		CommentResponseDto commentResponseDto =
			commentService.writeComment(albumId, customOAuth2User.getId(), commentRequestDto.content());
		return ApiResponse.ok(commentResponseDto);
	}

	@PatchMapping("/{commentId}")
	public ApiResponse<CommentResponseDto> modifyComment(@PathVariable Long albumId, @PathVariable Long commentId,
		@AuthenticationPrincipal CustomOAuth2User customOAuth2User, @RequestBody CommentRequestDto commentRequestDto) {
		CommentResponseDto commentResponseDto = commentService.modifyComment(commentId, customOAuth2User.getId(),
			commentRequestDto.content());
		return ApiResponse.ok(commentResponseDto);
	}

	@DeleteMapping("/{commentId}")
	public ApiResponse<CommentResponseDto> deleteComment(@PathVariable Long albumId, @PathVariable Long commentId,
		@AuthenticationPrincipal CustomOAuth2User customOAuth2User) {
		CommentResponseDto commentResponseDto = commentService.deleteComment(commentId, customOAuth2User.getId());
		return ApiResponse.ok(commentResponseDto);
	}
}
