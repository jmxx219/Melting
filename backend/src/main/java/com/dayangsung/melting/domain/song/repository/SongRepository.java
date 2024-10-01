package com.dayangsung.melting.domain.song.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.dayangsung.melting.domain.member.entity.Member;
import com.dayangsung.melting.domain.originalsong.entity.OriginalSong;
import com.dayangsung.melting.domain.song.entity.Song;
import com.dayangsung.melting.domain.song.enums.SongType;

public interface SongRepository extends JpaRepository<Song, Long> {
	List<Song> findByMemberIdAndIsDeletedFalse(Long memberId);

	boolean existsByMemberAndOriginalSongAndSongType(Member member, OriginalSong originalSong, SongType songType);

	@Query("SELECT s FROM Song s " +
		"WHERE s.album IS NULL " +
		"AND s.isDeleted = false " +
		"AND s.member.id = :memberId " +
		"AND s.originalSong.title LIKE %:keyword%")
	List<Song> findSongsForAlbumCreation(@Param("memberId") Long memberId, @Param("keyword") String keyword);
}
