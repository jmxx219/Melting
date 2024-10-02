package com.dayangsung.melting.domain.song.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.dayangsung.melting.domain.member.entity.Member;
import com.dayangsung.melting.domain.originalsong.entity.OriginalSong;
import com.dayangsung.melting.domain.song.entity.Song;
import com.dayangsung.melting.domain.song.enums.SongType;

public interface SongRepository extends JpaRepository<Song, Long> {
	List<Song> findByMemberId(Long memberId);

	boolean existsByMemberAndOriginalSongAndSongType(Member member, OriginalSong originalSong, SongType songType);

	@Query("SELECT s FROM Song s JOIN s.likesSongs ls WHERE ls.member.id = :memberId AND s.isDeleted = false ORDER BY s.createdAt DESC")
	Page<Song> findLikedSongsByMemberIdOrderByCreatedAtDesc(@Param("memberId") Long memberId, Pageable pageable);

	@Query("SELECT s FROM Song s JOIN s.likesSongs ls WHERE ls.member.id = :memberId AND s.isDeleted = false GROUP BY s.id ORDER BY COUNT(ls) DESC")
	Page<Song> findLikedSongsByMemberIdOrderByLikesCountDesc(@Param("memberId") Long memberId, Pageable pageable);
}
