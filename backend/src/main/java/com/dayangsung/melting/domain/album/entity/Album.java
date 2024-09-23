package com.dayangsung.melting.domain.album.entity;

import java.util.ArrayList;
import java.util.List;

import com.dayangsung.melting.domain.album.enums.AlbumCategory;
import com.dayangsung.melting.domain.hashtag.entity.AlbumGenre;
import com.dayangsung.melting.domain.hashtag.entity.AlbumHashtag;
import com.dayangsung.melting.domain.likes.entity.LikesAlbum;
import com.dayangsung.melting.domain.member.entity.Member;
import com.dayangsung.melting.domain.song.entity.Song;
import com.dayangsung.melting.global.entity.BaseEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Album extends BaseEntity {

	// 생성 앨범 식별자
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "album_id")
	private Long id;

	// 회원 식별자
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_id", nullable = false)
	private Member member;

	// 앨범명
	@Column(nullable = false)
	private String albumName;

	// 유형
	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
	private AlbumCategory category;

	// 앨범 소개
	@Column(columnDefinition = "TEXT")
	private String albumDescription;

	// 앨범 커버 이미지
	@Column(nullable = false)
	private String albumCoverImage;

	// 공개 여부
	@Column(nullable = false)
	private Boolean isPublic;

	// 삭제 여부
	@Column(nullable = false)
	private Boolean isDeleted;

	// 수록곡
	@OneToMany(mappedBy = "album")
	private List<Song> songs = new ArrayList<>();

	// 해시태그 목록
	@OneToMany(mappedBy = "album")
	private List<AlbumHashtag> hashtags = new ArrayList<>();

	// 장르 목록
	@OneToMany(mappedBy = "album")
	private List<AlbumGenre> genres = new ArrayList<>();

	@OneToMany(mappedBy = "album")
	private List<LikesAlbum> likesAlbums = new ArrayList<>();

	@Builder
	public Album(Member member, String albumName, AlbumCategory category, String albumDescription, String albumCoverImage) {
		this.member = member;
		this.albumName = albumName;
		this.category = category;
		this.albumDescription = albumDescription;
		this.albumCoverImage = albumCoverImage;
		this.isPublic = false;
		this.isDeleted = false;
	}

	public void updateAlbumName(String albumName) {
		this.albumName = albumName;
	}

	public void updateAlbumDescription(String albumDescription) {
		this.albumDescription = albumDescription;
	}

	public void togglePublicStatus() {
		this.isPublic = !isPublic;
	}

	public void deleteAlbum() {
		this.isDeleted = true;
	}

	public void addSong(Song song, Integer trackNumber, Boolean isTitle) {
		this.songs.add(song);
		song.setAlbum(this, trackNumber, isTitle);
	}

	public void removeSong(Song song) {
		this.songs.remove(song);
		song.removeFromAlbum();
	}
}