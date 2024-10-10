package com.dayangsung.melting.domain.song.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.dayangsung.melting.domain.song.entity.Song;
import com.dayangsung.melting.domain.song.enums.SongType;

public interface SongRepository extends JpaRepository<Song, Long> {
	List<Song> findByMemberId(Long memberId);

	@Query("SELECT s FROM Song s WHERE s.member.id = :memberId AND s.originalSong.id = :originalSongId AND s.songType = :songType")
	Optional<Song> findByMemberIdAndOriginalSongIdAndSongType(@Param("memberId") Long memberId,
		@Param("originalSongId") Long originalSongId, @Param("songType") SongType songType);

	@Query("SELECT s FROM Song s " +
		"WHERE s.album IS NULL " +
		"AND s.member.id = :memberId " +
		"AND s.originalSong.title ILIKE %:keyword%")
	List<Song> findSongsForAlbumCreation(@Param("memberId") Long memberId, @Param("keyword") String keyword);

	@Query("SELECT s FROM Song s " +
		"WHERE s.album IS NULL " +
		"AND s.member.id = :memberId ")
	List<Song> findAllSongsForAlbumCreation(@Param("memberId") Long memberId);

	@Query("SELECT s FROM Song s JOIN s.likesSongs ls WHERE ls.member.id = :memberId AND ls.isLiked = true ORDER BY s.createdAt DESC")
	Page<Song> findLikedSongsByMemberIdOrderByCreatedAtDesc(@Param("memberId") Long memberId, Pageable pageable);

	@Query("SELECT s FROM Song s JOIN s.likesSongs ls WHERE ls.member.id = :memberId AND ls.isLiked = true GROUP BY s.id ORDER BY COUNT(ls) DESC")
	Page<Song> findLikedSongsByMemberIdOrderByLikesCountDesc(@Param("memberId") Long memberId, Pageable pageable);
}
