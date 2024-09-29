package com.dayangsung.melting.domain.album.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.dayangsung.melting.domain.album.entity.Album;

public interface AlbumRepository extends JpaRepository<Album, Long> {

	Page<Album> findAllByOrderByCreatedAtDesc(Pageable pageable);

	@Query("SELECT a FROM Album a LEFT JOIN a.likesAlbums la GROUP BY a.id ORDER BY COUNT(la) DESC")
	Page<Album> findAllByOrderByLikesCountDesc(Pageable pageable);

	@Query("SELECT a FROM Album a WHERE a.albumName LIKE %:keyword%")
	Page<Album> findByAlbumNameContaining(@Param("keyword") String keyword, Pageable pageable);

	@Query("SELECT a FROM Album a JOIN a.songs s JOIN s.originalSong o WHERE o.title LIKE %:keyword%")
	Page<Album> findBySongTitleContaining(@Param("keyword") String keyword, Pageable pageable);

	@Query("SELECT DISTINCT a FROM Album a JOIN a.hashtags ah JOIN ah.hashtag h WHERE h.content LIKE %:keyword%")
	Page<Album> findByHashtagContentContaining(@Param("keyword") String keyword, Pageable pageable);

	@Query("SELECT DISTINCT a FROM Album a JOIN a.genres ag JOIN ag.genre g WHERE g.content LIKE %:keyword%")
	Page<Album> findByGenreNameContaining(@Param("keyword") String keyword, Pageable pageable);
}
