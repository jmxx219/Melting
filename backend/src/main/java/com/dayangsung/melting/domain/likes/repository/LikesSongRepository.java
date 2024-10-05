package com.dayangsung.melting.domain.likes.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.dayangsung.melting.domain.likes.entity.LikesSong;

public interface LikesSongRepository extends JpaRepository<LikesSong, Long> {

	Optional<LikesSong> findLikesSongBySongIdAndMemberId(Long songId, Long memberId);

	@Query("SELECT ls FROM LikesSong ls WHERE ls.member.id = :memberId AND ls.song.id = :songId AND ls.status = true")
	boolean existsByMemberIdAndSongIdAndStatusTrue(
		@Param("memberId") Long memberId,
		@Param("songId") Long songId);
}
