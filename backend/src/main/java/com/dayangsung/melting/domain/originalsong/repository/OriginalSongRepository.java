package com.dayangsung.melting.domain.originalsong.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.dayangsung.melting.domain.originalsong.entity.OriginalSong;

public interface OriginalSongRepository extends JpaRepository<OriginalSong, Long> {

	@Query("SELECT os FROM OriginalSong os WHERE os.title LIKE %:keyword% OR os.artist LIKE %:keyword%")
	List<OriginalSong> findByKeyword(@Param("keyword") String keyword);
}
