package com.dayangsung.melting.domain.genre.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dayangsung.melting.domain.genre.entity.Genre;

public interface GenreRepository extends JpaRepository<Genre, Long> {
}
