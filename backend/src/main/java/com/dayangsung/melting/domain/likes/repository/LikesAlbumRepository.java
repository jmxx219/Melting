package com.dayangsung.melting.domain.likes.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.dayangsung.melting.domain.likes.entity.LikesAlbum;

public interface LikesAlbumRepository extends JpaRepository<LikesAlbum, Long> {

	Optional<LikesAlbum> findLikesAlbumByAlbumIdAndMemberId(Long albumId, Long memberId);

	@Query("SELECT COUNT(la) > 0 FROM LikesAlbum la WHERE la.member.id = :memberId AND la.album.id = :albumId AND la.isLiked = true")
	Boolean existsByMemberIdAndAlbumIdAndStatusTrue(
		@Param("memberId") Long memberId,
		@Param("albumId") Long albumId);
}
