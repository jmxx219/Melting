package com.dayangsung.melting.domain.album.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.dayangsung.melting.domain.album.entity.Album;

public interface AlbumRepository extends JpaRepository<Album, Long> {

	Page<Album> findAllByOrderByCreatedAtDesc(Pageable pageable);
}
