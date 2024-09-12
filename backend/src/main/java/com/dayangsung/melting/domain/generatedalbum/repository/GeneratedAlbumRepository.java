package com.dayangsung.melting.domain.generatedalbum.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dayangsung.melting.domain.generatedalbum.entity.GeneratedAlbum;

public interface GeneratedAlbumRepository extends JpaRepository<GeneratedAlbum, Long> {

	List<GeneratedAlbum> findByIsPublicTrue();

}