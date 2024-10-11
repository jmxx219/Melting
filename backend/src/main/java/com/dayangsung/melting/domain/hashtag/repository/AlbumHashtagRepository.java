package com.dayangsung.melting.domain.hashtag.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dayangsung.melting.domain.album.entity.Album;
import com.dayangsung.melting.domain.hashtag.entity.AlbumHashtag;
import com.dayangsung.melting.domain.hashtag.entity.Hashtag;

public interface AlbumHashtagRepository extends JpaRepository<AlbumHashtag, Long> {

	Optional<AlbumHashtag> findByAlbumAndHashtag(Album album, Hashtag hashtag);
}
