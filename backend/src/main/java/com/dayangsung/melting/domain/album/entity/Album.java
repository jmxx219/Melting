package com.dayangsung.melting.domain.album.entity;

import java.util.ArrayList;
import java.util.List;

import com.dayangsung.melting.domain.album.enums.AlbumCategory;
import com.dayangsung.melting.domain.comment.entity.Comment;
import com.dayangsung.melting.domain.genre.entity.AlbumGenre;
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
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Album extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "album_id")
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_id", nullable = false)
	private Member member;

	@Column(nullable = false)
	private String albumName;

	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
	private AlbumCategory category;

	@Size(min = 50, max = 1000)
	private String albumDescription;

	@Column(nullable = false)
	private String albumCoverImageUrl;

	@Column(nullable = false)
	private Boolean isPublic;

	@Column(nullable = false)
	private Boolean isDeleted;

	@OneToMany(mappedBy = "album")
	private List<Song> songs = new ArrayList<>();

	@OneToMany(mappedBy = "album")
	private List<AlbumHashtag> hashtags = new ArrayList<>();

	@OneToMany(mappedBy = "album")
	private List<AlbumGenre> genres = new ArrayList<>();

	@OneToMany(mappedBy = "album")
	private List<LikesAlbum> likesAlbums = new ArrayList<>();

	@OneToMany(mappedBy = "album")
	private List<Comment> comments = new ArrayList<>();

	@Builder
	public Album(Member member, String albumName, AlbumCategory category,
		String albumDescription, String albumCoverImageUrl) {
		this.member = member;
		this.albumName = albumName;
		this.category = category;
		this.albumDescription = albumDescription;
		this.albumCoverImageUrl = albumCoverImageUrl;
		this.isPublic = false;
		this.isDeleted = false;
	}
}
