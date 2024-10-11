package com.dayangsung.melting.domain.album.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.dayangsung.melting.domain.album.entity.Album;

public interface AlbumRepository extends JpaRepository<Album, Long> {

	@Query("SELECT a FROM Album a WHERE a.isDeleted = false AND a.isPublic = true ORDER BY a.createdAt DESC")
	Page<Album> findAllByOrderByCreatedAtDesc(Pageable pageable);

	@Query("SELECT a FROM Album a LEFT JOIN a.likesAlbums la WHERE a.isDeleted = false AND a.isPublic = true GROUP BY a.id ORDER BY COUNT(la) DESC")
	Page<Album> findAllByOrderByLikesCountDesc(Pageable pageable);

	@Query("SELECT a FROM Album a WHERE a.isDeleted = false AND a.isPublic = true AND a.albumName ILIKE %:keyword%")
	Page<Album> findByAlbumNameContaining(@Param("keyword") String keyword, Pageable pageable);

	@Query("SELECT a FROM Album a JOIN a.songs s WHERE a.isDeleted = false AND a.isPublic = true AND s.originalSong.title ILIKE %:keyword%")
	Page<Album> findBySongTitleContaining(@Param("keyword") String keyword, Pageable pageable);

	@Query("SELECT a FROM Album a JOIN a.hashtags ah WHERE a.isDeleted = false AND a.isPublic = true AND ah.hashtag.content ILIKE %:keyword%")
	Page<Album> findByHashtagContentContaining(@Param("keyword") String keyword, Pageable pageable);

	@Query("SELECT a FROM Album a JOIN a.genres ag WHERE a.isDeleted = false AND a.isPublic = true AND ag.genre.content ILIKE %:keyword%")
	Page<Album> findByGenreNameContaining(@Param("keyword") String keyword, Pageable pageable);

	@Query("SELECT a FROM Album a WHERE a.member.id = :memberId AND a.isDeleted = false ORDER BY a.createdAt DESC")
	Page<Album> findByMemberIdAndOrderByCreatedAtDesc(@Param("memberId") Long memberId, Pageable pageable);

	@Query("SELECT a FROM Album a LEFT JOIN a.likesAlbums la WHERE a.member.id = :memberId AND a.isDeleted = false GROUP BY a.id ORDER BY COUNT(la) DESC")
	Page<Album> findByMemberIdAndOrderByLikesCountDesc(@Param("memberId") Long memberId, Pageable pageable);

	@Query("SELECT a FROM Album a JOIN a.likesAlbums la WHERE la.member.id = :memberId AND a.isDeleted = false AND a.isPublic = true AND la.isLiked = true ORDER BY a.createdAt DESC")
	Page<Album> findLikedAlbumsByMemberIdOrderByCreatedAtDesc(@Param("memberId") Long memberId, Pageable pageable);

	@Query("SELECT a FROM Album a JOIN a.likesAlbums la WHERE la.member.id = :memberId AND a.isDeleted = false AND a.isPublic = true AND la.isLiked = true GROUP BY a.id ORDER BY COUNT(la) DESC")
	Page<Album> findLikedAlbumsByMemberIdOrderByLikesCountDesc(@Param("memberId") Long memberId, Pageable pageable);

	@Query("SELECT a FROM Album a JOIN a.hashtags ah JOIN ah.hashtag h WHERE h.content = :hashtag AND a.isDeleted = false AND a.isPublic = true ORDER BY a.createdAt DESC")
	Page<Album> findByHashtag(@Param("hashtag") String hashtag, Pageable pageable);
}
