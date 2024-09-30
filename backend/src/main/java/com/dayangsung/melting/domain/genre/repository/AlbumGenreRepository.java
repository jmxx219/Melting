package com.dayangsung.melting.domain.genre.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dayangsung.melting.domain.genre.entity.AlbumGenre;

public interface AlbumGenreRepository extends JpaRepository<AlbumGenre, Long> {
}
