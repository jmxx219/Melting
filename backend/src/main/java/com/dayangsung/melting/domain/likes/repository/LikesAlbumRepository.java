package com.dayangsung.melting.domain.likes.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.dayangsung.melting.domain.likes.entity.LikesAlbum;

public interface LikesAlbumRepository extends JpaRepository<LikesAlbum, Long> {

	Optional<LikesAlbum> findLikesAlbumByAlbumIdAndMemberId(Long albumId, Long memberId);
	Boolean existsLikesAlbumByAlbumIdAndMemberId(Long albumId, Long memberId);
}
