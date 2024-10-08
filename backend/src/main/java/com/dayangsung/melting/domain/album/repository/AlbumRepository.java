package com.dayangsung.melting.domain.album.repository;

import java.util.List;

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

	@Query("SELECT a FROM Album a WHERE a.isDeleted = false AND a.isPublic = true AND a.albumName LIKE %:keyword% ORDER BY a.createdAt DESC")
	List<Album> findByAlbumNameContainingOrderByLatest(@Param("keyword") String keyword);

	@Query("SELECT a FROM Album a LEFT JOIN a.likesAlbums al WHERE a.isDeleted = false AND a.isPublic = true AND a.albumName LIKE %:keyword% GROUP BY a ORDER BY COUNT(al) DESC")
	List<Album> findByAlbumNameContainingOrderByPopularity(@Param("keyword") String keyword);

	@Query("SELECT a FROM Album a JOIN a.songs s WHERE a.isDeleted = false AND a.isPublic = true AND s.originalSong.title LIKE %:keyword% ORDER BY a.createdAt DESC")
	List<Album> findBySongTitleContainingOrderByLatest(@Param("keyword") String keyword);

	@Query("SELECT a FROM Album a LEFT JOIN a.likesAlbums al JOIN a.songs s WHERE a.isDeleted = false AND a.isPublic = true AND s.originalSong.title LIKE %:keyword% GROUP BY a ORDER BY COUNT(al) DESC")
	List<Album> findBySongTitleContainingOrderByPopularity(@Param("keyword") String keyword);

	@Query("SELECT a FROM Album a JOIN a.hashtags ah WHERE a.isDeleted = false AND a.isPublic = true AND ah.hashtag.content LIKE %:keyword% ORDER BY a.createdAt DESC")
	List<Album> findByHashtagContentContainingOrderByLatest(@Param("keyword") String keyword);

	@Query("SELECT a FROM Album a LEFT JOIN a.likesAlbums al JOIN a.hashtags ah WHERE a.isDeleted = false AND a.isPublic = true AND ah.hashtag.content LIKE %:keyword% GROUP BY a ORDER BY COUNT(al) DESC")
	List<Album> findByHashtagContentContainingOrderByPopularity(@Param("keyword") String keyword);

	@Query("SELECT a FROM Album a JOIN a.genres ag WHERE a.isDeleted = false AND a.isPublic = true AND ag.genre.content LIKE %:keyword% ORDER BY a.createdAt DESC")
	List<Album> findByGenreNameContainingOrderByLatest(@Param("keyword") String keyword);

	@Query("SELECT a FROM Album a LEFT JOIN a.likesAlbums al JOIN a.genres ag WHERE a.isDeleted = false AND a.isPublic = true AND ag.genre.content LIKE %:keyword% GROUP BY a ORDER BY COUNT(al) DESC")
	List<Album> findByGenreNameContainingOrderByPopularity(@Param("keyword") String keyword);

	@Query("SELECT a FROM Album a WHERE a.member.id = :memberId AND a.isDeleted = false ORDER BY a.createdAt DESC")
	Page<Album> findByMemberIdAndOrderByCreatedAtDesc(@Param("memberId") Long memberId, Pageable pageable);

	@Query("SELECT a FROM Album a LEFT JOIN a.likesAlbums la WHERE a.member.id = :memberId AND a.isDeleted = false GROUP BY a.id ORDER BY COUNT(la) DESC")
	Page<Album> findByMemberIdAndOrderByLikesCountDesc(@Param("memberId") Long memberId, Pageable pageable);

	@Query("SELECT a FROM Album a JOIN a.likesAlbums la WHERE la.member.id = :memberId AND a.isDeleted = false AND a.isPublic = true AND la.isLiked = true ORDER BY a.createdAt DESC")
	Page<Album> findLikedAlbumsByMemberIdOrderByCreatedAtDesc(@Param("memberId") Long memberId, Pageable pageable);

	@Query("SELECT a FROM Album a JOIN a.likesAlbums la WHERE la.member.id = :memberId AND a.isDeleted = false AND a.isPublic = true AND la.isLiked = true GROUP BY a.id ORDER BY COUNT(la) DESC")
	Page<Album> findLikedAlbumsByMemberIdOrderByLikesCountDesc(@Param("memberId") Long memberId, Pageable pageable);

	@Query("SELECT a FROM Album a JOIN a.hashtags ah JOIN ah.hashtag h WHERE h.content = :hashtag ORDER BY a.createdAt DESC")
	Page<Album> findByHashtag(@Param("hashtag") String hashtag, Pageable pageable);
}
