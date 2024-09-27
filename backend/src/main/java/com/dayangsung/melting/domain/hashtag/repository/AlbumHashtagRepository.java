package com.dayangsung.melting.domain.hashtag.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dayangsung.melting.domain.hashtag.entity.AlbumHashtag;

public interface AlbumHashtagRepository extends JpaRepository<AlbumHashtag, Long> {
}
