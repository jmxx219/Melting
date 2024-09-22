package com.dayangsung.melting.domain.comment.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.dayangsung.melting.domain.comment.entity.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long> {

	@Query("SELECT c FROM Comment c WHERE c.album.id = :albumId AND c.isDeleted = false")
	List<Comment> findByAlbumIdAndNotDeleted(@Param("albumId") Long albumId);
}
