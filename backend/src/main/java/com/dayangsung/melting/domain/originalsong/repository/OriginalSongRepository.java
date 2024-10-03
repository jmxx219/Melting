package com.dayangsung.melting.domain.originalsong.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.dayangsung.melting.domain.originalsong.entity.OriginalSong;

public interface OriginalSongRepository extends JpaRepository<OriginalSong, Long> {
	@Query("SELECT o FROM OriginalSong o ORDER BY o.artist ASC")
	Page<OriginalSong> findAllOrderByArtistAsc(Pageable pageable);

	@Query("SELECT os FROM OriginalSong os WHERE os.title LIKE %:keyword% OR os.artist LIKE %:keyword%")
	Page<OriginalSong> findByKeyword(@Param("keyword") String keyword, Pageable pageable);
}
