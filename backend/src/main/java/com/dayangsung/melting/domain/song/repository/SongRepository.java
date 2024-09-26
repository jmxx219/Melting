package com.dayangsung.melting.domain.song.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dayangsung.melting.domain.song.entity.Song;

public interface SongRepository extends JpaRepository<Song, Long> {
}
