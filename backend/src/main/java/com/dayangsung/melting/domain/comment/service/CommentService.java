package com.dayangsung.melting.domain.comment.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;

import com.dayangsung.melting.domain.album.entity.Album;
import com.dayangsung.melting.domain.album.repository.AlbumRepository;
import com.dayangsung.melting.domain.comment.dto.response.CommentResponseDto;
import com.dayangsung.melting.domain.comment.entity.Comment;
import com.dayangsung.melting.domain.comment.repository.CommentRepository;
import com.dayangsung.melting.domain.member.entity.Member;
import com.dayangsung.melting.domain.member.repository.MemberRepository;
import com.dayangsung.melting.global.common.service.AwsS3Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class CommentService {

	private final CommentRepository commentRepository;
	private final AlbumRepository albumRepository;
	private final MemberRepository memberRepository;
	private final AwsS3Service awsS3Service;

	public List<CommentResponseDto> getAllComments(Long albumId, int page, int size) {
		Pageable pageable = PageRequest.of(page, size);
		Slice<Comment> commentList =
			commentRepository.findByAlbumIdAndNotDeleted(albumId, pageable);
		return commentList.stream()
			.map(comment -> CommentResponseDto.of(
				comment,
				awsS3Service.getProfileImageUrl(comment.getMember().getId(),
					comment.getMember().getProfileImageExtension()),
				comment.getMember().getNickname()
			))
			.collect(Collectors.toList());
	}

	public CommentResponseDto writeComment(Long albumId, String email, String content) {
		Album album = albumRepository.getReferenceById(albumId);
		Member member = memberRepository.findByEmail(email).orElseThrow(RuntimeException::new);
		Comment comment = commentRepository.save(
			Comment.builder()
				.album(album)
				.member(member)
				.content(content)
				.build());
		return CommentResponseDto.of(
			comment,
			awsS3Service.getProfileImageUrl(comment.getMember().getId(),
				comment.getMember().getProfileImageExtension()),
			comment.getMember().getNickname()
		);
	}

	// 아래 email들은 추후 메소드 시큐리티 적용할 때 사용할 예정
	public CommentResponseDto modifyComment(Long commentId, String email, String content) {
		Comment comment = commentRepository.getReferenceById(commentId);
		comment.modifyContent(content);
		commentRepository.save(comment);
		return CommentResponseDto.of(
			comment,
			awsS3Service.getProfileImageUrl(comment.getMember().getId(),
				comment.getMember().getProfileImageExtension()),
			comment.getMember().getNickname()
		);
	}

	public CommentResponseDto deleteComment(Long commentId, String email) {
		Comment comment = commentRepository.getReferenceById(commentId);
		comment.deleteComment();
		commentRepository.save(comment);
		return CommentResponseDto.of(
			comment,
			awsS3Service.getProfileImageUrl(comment.getMember().getId(),
				comment.getMember().getProfileImageExtension()),
			comment.getMember().getNickname()
		);
	}
}
