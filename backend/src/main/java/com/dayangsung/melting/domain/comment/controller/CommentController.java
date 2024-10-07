package com.dayangsung.melting.domain.comment.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dayangsung.melting.domain.auth.CustomOAuth2User;
import com.dayangsung.melting.domain.comment.dto.request.CommentRequestDto;
import com.dayangsung.melting.domain.comment.dto.response.CommentPageResponseDto;
import com.dayangsung.melting.domain.comment.dto.response.CommentResponseDto;
import com.dayangsung.melting.domain.comment.service.CommentService;
import com.dayangsung.melting.global.aop.LogExecution;
import com.dayangsung.melting.global.common.response.ApiResponse;

import lombok.RequiredArgsConstructor;

// TODO : 작성자만 수정 삭제 가능하게 메소드 시큐리티 적용
@RestController
@RequestMapping("/api/v1/albums/{albumId}/comments")
@RequiredArgsConstructor
@LogExecution
public class CommentController {

	private final CommentService commentService;

	@GetMapping
	public ApiResponse<CommentPageResponseDto> getAllComments(
		@PathVariable Long albumId,
		@RequestParam(defaultValue = "0") int page,
		@RequestParam(defaultValue = "10") int size,
		@AuthenticationPrincipal CustomOAuth2User customOAuth2User) {
		CommentPageResponseDto commentResponseDtoList =
			commentService.getAllComments(albumId, customOAuth2User.getName(), page, size);
		return ApiResponse.ok(commentResponseDtoList);
	}

	@PostMapping
	public ApiResponse<CommentResponseDto> writeComment(@PathVariable Long albumId,
		@AuthenticationPrincipal String email, @RequestBody CommentRequestDto commentRequestDto) {
		CommentResponseDto commentResponseDto =
			commentService.writeComment(albumId, email, commentRequestDto.content());
		return ApiResponse.ok(commentResponseDto);
	}

	@PatchMapping("/{commentId}")
	public ApiResponse<CommentResponseDto> modifyComment(@PathVariable Long albumId, @PathVariable Long commentId,
		@AuthenticationPrincipal String email, @RequestBody CommentRequestDto commentRequestDto) {
		CommentResponseDto commentResponseDto = commentService.updateComment(commentId, email,
			commentRequestDto.content());
		return ApiResponse.ok(commentResponseDto);
	}

	@DeleteMapping("/{commentId}")
	public ApiResponse<CommentResponseDto> deleteComment(@PathVariable Long albumId, @PathVariable Long commentId,
		@AuthenticationPrincipal String email) {
		CommentResponseDto commentResponseDto = commentService.deleteComment(commentId, email);
		return ApiResponse.ok(commentResponseDto);
	}
}
