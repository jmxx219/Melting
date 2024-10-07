package com.dayangsung.melting.domain.comment.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dayangsung.melting.domain.album.entity.Album;
import com.dayangsung.melting.domain.album.repository.AlbumRepository;
import com.dayangsung.melting.domain.comment.dto.response.CommentPageResponseDto;
import com.dayangsung.melting.domain.comment.dto.response.CommentResponseDto;
import com.dayangsung.melting.domain.comment.entity.Comment;
import com.dayangsung.melting.domain.comment.repository.CommentRepository;
import com.dayangsung.melting.domain.member.entity.Member;
import com.dayangsung.melting.domain.member.repository.MemberRepository;
import com.dayangsung.melting.global.common.enums.ErrorMessage;
import com.dayangsung.melting.global.exception.BusinessException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class CommentService {

	private final CommentRepository commentRepository;
	private final MemberRepository memberRepository;
	private final AlbumRepository albumRepository;

	public CommentPageResponseDto getAllComments(Long albumId, String email, int page, int size) {
		Member member = memberRepository.findByEmail(email)
			.orElseThrow(() -> new BusinessException(ErrorMessage.MEMBER_NOT_FOUND));
		Pageable pageable = PageRequest.of(page, size);
		Page<Comment> commentPage = commentRepository.findByAlbumIdAndNotDeleted(albumId, pageable);
		Page<CommentResponseDto> commentResponse =
			commentPage.map(comment -> CommentResponseDto.of(comment, isMyComment(comment, member.getId())));
		return CommentPageResponseDto.of(commentResponse);
	}

	@Transactional
	public CommentResponseDto writeComment(Long albumId, String email, String content) {
		Member member = memberRepository.findByEmail(email)
			.orElseThrow(() -> new BusinessException(ErrorMessage.MEMBER_NOT_FOUND));
		Album album = albumRepository.getReferenceById(albumId);
		Comment comment = commentRepository.save(
			Comment.builder()
				.album(album)
				.member(member)
				.content(content)
				.build());
		if (!album.getComments().contains(comment)) {
			album.addComment(comment);
		}
		return CommentResponseDto.of(comment, isMyComment(comment, member.getId()));
	}

	@Transactional
	public CommentResponseDto updateComment(Long commentId, String email, String content) {
		Member member = memberRepository.findByEmail(email)
			.orElseThrow(() -> new BusinessException(ErrorMessage.MEMBER_NOT_FOUND));
		Comment comment = commentRepository.getReferenceById(commentId);
		validateRequest(comment, member);
		comment.updateContent(content);
		commentRepository.save(comment);
		return CommentResponseDto.of(comment, isMyComment(comment, member.getId()));
	}

	@Transactional
	public CommentResponseDto deleteComment(Long commentId, String email) {
		Member member = memberRepository.findByEmail(email)
			.orElseThrow(() -> new BusinessException(ErrorMessage.MEMBER_NOT_FOUND));
		Comment comment = commentRepository.getReferenceById(commentId);
		validateRequest(comment, member);
		comment.deleteComment();
		commentRepository.save(comment);
		return CommentResponseDto.of(comment, isMyComment(comment, member.getId()));
	}

	private Boolean isMyComment(Comment comment, Long memberId) {
		return comment.getMember().getId().equals(memberId);
	}

	private void validateRequest(Comment comment, Member member) {
		if (!comment.getMember().getId().equals(member.getId())) {
			throw new BusinessException(ErrorMessage.BAD_REQUEST);
		}
	}
}
