package com.dayangsung.melting.domain.albumsong.entity;

import com.dayangsung.melting.domain.album.entity.Album;
import com.dayangsung.melting.domain.song.entity.Song;
import com.dayangsung.melting.global.entity.BaseEntity;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "album_song")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AlbumSong extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "album_id")
	private Album album;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "song_id")
	private Song song;

	private int trackNumber;

	private boolean isTitle;

	@Builder
	public AlbumSong(Album album, Song song, int trackNumber) {
		this.album = album;
		this.song = song;
		this.trackNumber = trackNumber;
		this.isTitle = false;
	}
}