package com.dayangsung.melting.domain.album.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dayangsung.melting.domain.album.entity.Album;

public interface AlbumRepository extends JpaRepository<Album, Long> {

	List<Album> findByIsPublicTrue();
	List<Album> findByIsPublicTrueAndIsDeletedFalse();


}