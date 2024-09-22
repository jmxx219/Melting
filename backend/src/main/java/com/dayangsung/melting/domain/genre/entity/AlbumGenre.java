package com.dayangsung.melting.domain.hashtag.entity;

import com.dayangsung.melting.domain.album.entity.Album;
import com.dayangsung.melting.domain.genre.entity.Genre;

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

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AlbumGenre {

	@Id
	@Column(name = "album_genre_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "album_id", nullable = false)
	private Album album;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "genre_id", nullable = false)
	private Genre genre;

}
