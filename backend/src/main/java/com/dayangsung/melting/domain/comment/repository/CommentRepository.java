package com.dayangsung.melting.domain.comment.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.dayangsung.melting.domain.comment.entity.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long> {

	@Query("SELECT c FROM Comment c WHERE c.album.id = :albumId AND c.isDeleted = false ORDER BY c.createdAt DESC")
	Slice<Comment> findByAlbumIdAndNotDeleted(@Param("albumId") Long albumId, Pageable pageable);
}
