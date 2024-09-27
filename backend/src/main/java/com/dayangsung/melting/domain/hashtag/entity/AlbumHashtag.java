package com.dayangsung.melting.domain.hashtag.entity;

import com.dayangsung.melting.domain.album.entity.Album;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class AlbumHashtag {

	@Id
	@Column(name = "album_hashtag_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Setter
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "album_id", nullable = false)
	private Album album;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "hashtag_id", nullable = false)
	private Hashtag hashtag;

	@Builder
	public AlbumHashtag(Album album, Hashtag hashtag) {
		this.album = album;
		this.hashtag = hashtag;
	}
}
