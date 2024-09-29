package com.dayangsung.melting.domain.album.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.dayangsung.melting.domain.album.entity.Album;

public interface AlbumRepository extends JpaRepository<Album, Long> {

	@Query("SELECT a FROM Album a WHERE a.isDeleted = false AND a.isPublic = true ORDER BY a.createdAt DESC")
	Page<Album> findAllByOrderByCreatedAtDesc(Pageable pageable);

	@Query("SELECT a FROM Album a LEFT JOIN a.likesAlbums la WHERE a.isDeleted = false AND a.isPublic = true GROUP BY a.id ORDER BY COUNT(la) DESC")
	Page<Album> findAllByOrderByLikesCountDesc(Pageable pageable);

	@Query("SELECT a FROM Album a WHERE a.isDeleted = false AND a.isPublic = true AND a.albumName LIKE %:keyword%")
	Page<Album> findByAlbumNameContaining(@Param("keyword") String keyword, Pageable pageable);

	@Query("SELECT a FROM Album a JOIN a.songs s WHERE a.isDeleted = false AND a.isPublic = true AND s.originalSong.title LIKE %:keyword%")
	Page<Album> findBySongTitleContaining(@Param("keyword") String keyword, Pageable pageable);

	@Query("SELECT a FROM Album a JOIN a.hashtags ah WHERE a.isDeleted = false AND a.isPublic = true AND ah.hashtag.content LIKE %:keyword%")
	Page<Album> findByHashtagContentContaining(@Param("keyword") String keyword, Pageable pageable);
	
	@Query("SELECT a FROM Album a JOIN a.genres ag WHERE a.isDeleted = false AND a.isPublic = true AND ag.genre.content LIKE %:keyword%")
	Page<Album> findByGenreNameContaining(@Param("keyword") String keyword, Pageable pageable);
}
