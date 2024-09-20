package com.dayangsung.melting.domain.album.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.dayangsung.melting.domain.album.entity.Album;

import io.lettuce.core.dynamic.annotation.Param;

public interface AlbumRepository extends JpaRepository<Album, Long> {

	// 공개되어 있고 삭제되지 않은 앨범 최신순 정렬
	List<Album> findByIsPublicTrueAndIsDeletedFalseOrderByCreatedAtDesc();

	// 공개되어 있고 삭제되지 않은 앨범 좋아요순 정렬
	List<Album> findByIsPublicTrueAndIsDeletedFalseOrderByLikedCountDesc();

	// 키워드로 앨범 이름 검색하여 앨범 조회
	@Query("SELECT a FROM Album a WHERE a.albumName LIKE %:keyword% AND a.isPublic = true AND a.isDeleted = false")
	List<Album> findAlbumsByAlbumName(@Param("keyword") String keyword);

	// 키워드로 곡 이름 검색하여 앨범 조회
	@Query("SELECT a FROM Album a JOIN a.songs s WHERE s.originalSong.title LIKE %:keyword% AND a.isPublic = true AND a.isDeleted = false")
	List<Album> findAlbumsBySongName(@Param("keyword") String keyword);

	// 키워드로 해시태그 내용 검색하여 앨범 조회
	@Query("SELECT a FROM Album a JOIN a.hashtags h WHERE h.hashtag.content LIKE %:keyword% AND a.isPublic = true AND a.isDeleted = false")
	List<Album> findAlbumsByHashtag(@Param("keyword") String keyword);

	// 키워드로 장르 검색하여 앨범 조회
	@Query("SELECT a FROM Album a JOIN a.genres g WHERE g.genre.content LIKE %:keyword% AND a.isPublic = true AND a.isDeleted = false")
	List<Album> findAlbumsByGenre(@Param("keyword") String keyword);

}