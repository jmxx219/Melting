package com.dayangsung.melting.domain.album.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.dayangsung.melting.domain.album.entity.Album;

public interface AlbumRepository extends JpaRepository<Album, Long> {

	Page<Album> findAllByOrderByCreatedAtDesc(Pageable pageable);

	@Query("SELECT a FROM Album a LEFT JOIN a.likesAlbums la GROUP BY a.id ORDER BY COUNT(la) DESC")
	Page<Album> findAllByOrderByLikesCountDesc(Pageable pageable);
}
