package com.dayangsung.melting.domain.album.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.dayangsung.melting.domain.album.entity.Album;

import io.lettuce.core.dynamic.annotation.Param;

public interface AlbumRepository extends JpaRepository<Album, Long> {

	List<Album> findByIsPublicTrueAndIsDeletedFalse();

	@Query("SELECT a FROM Album a WHERE a.albumName LIKE %:keyword% AND a.isPublic = true AND a.isDeleted = false")
	List<Album> findByKeywordAndIsPublicTrueAndIsDeletedFalse(@Param("keyword") String keyword);

}