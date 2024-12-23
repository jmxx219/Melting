package com.dayangsung.melting.domain.song.entity;

import java.util.ArrayList;
import java.util.List;

import com.dayangsung.melting.domain.album.entity.Album;
import com.dayangsung.melting.domain.likes.entity.LikesSong;
import com.dayangsung.melting.domain.member.entity.Member;
import com.dayangsung.melting.domain.originalsong.entity.OriginalSong;
import com.dayangsung.melting.domain.song.enums.SongType;
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
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "song")
public class Song extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "song_id")
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "original_song_id")
	private OriginalSong originalSong;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_id")
	private Member member;

	@Setter
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "album_id")
	private Album album;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private SongType songType;

	@Column(nullable = false)
	private String songUrl;

	private Integer trackNumber;

	private Boolean isTitle;

	@OneToMany(mappedBy = "song")
	private List<LikesSong> likesSongs = new ArrayList<>();

	@Builder
	public Song(OriginalSong originalSong, Member member, SongType songType,
		String songUrl) {
		this.originalSong = originalSong;
		this.member = member;
		this.album = null;
		this.songType = songType;
		this.songUrl = songUrl;
		this.trackNumber = null;
		this.isTitle = null;
	}

	public void removeFromAlbum() {
		this.album = null;
		this.trackNumber = null;
		this.isTitle = null;
	}

	public void updateSongUrl(String songUrl) {
		this.songUrl = songUrl;
	}

	public void setAlbumInfo(Album album, Integer trackNumber, Boolean isTitle) {
		this.album = album;
		this.trackNumber = trackNumber;
		this.isTitle = isTitle;
	}

	public void addSongLikes(LikesSong likesSong) {
		this.likesSongs.add(likesSong);
		likesSong.setSong(this);
	}
}
