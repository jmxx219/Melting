package com.dayangsung.melting.domain.likes.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.dayangsung.melting.domain.likes.entity.LikesSong;

public interface LikesSongRepository extends JpaRepository<LikesSong, Long> {

	Optional<LikesSong> findLikesSongBySongIdAndMemberId(Long songId, Long memberId);
}
