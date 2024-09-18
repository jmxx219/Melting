package com.dayangsung.melting.domain.albumsong.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.dayangsung.melting.domain.albumsong.entity.AlbumSong;
import com.dayangsung.melting.domain.song.entity.Song;

@Repository
public interface AlbumSongRepository extends JpaRepository<AlbumSong, Long> {
	@Query("SELECT als.album.albumCoverImage FROM AlbumSong AS als WHERE als.song = :song " +
		"AND als.album.isPublic = true " +
		"ORDER BY als.album.createdAt DESC")
	Optional<String> findLatestPublicAlbumCoverImageBySong(@Param("song") Song song);
}
