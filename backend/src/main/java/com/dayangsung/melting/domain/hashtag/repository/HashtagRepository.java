package com.dayangsung.melting.domain.hashtag.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.dayangsung.melting.domain.hashtag.entity.Hashtag;

public interface HashtagRepository extends JpaRepository<Hashtag, Long> {

	Optional<Hashtag> findByContent(String content);

	Boolean existsByContent(String content);

	@Query("SELECT h FROM Hashtag h WHERE h.content ILIKE %:keyword%")
	Page<Hashtag> findByContentContaining(@Param("keyword") String keyword, Pageable pageable);
}
