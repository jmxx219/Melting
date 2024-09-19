package com.dayangsung.melting.domain.originalsong.entity;

import com.dayangsung.melting.global.entity.BaseEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class OriginalSong extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "original_song_id")
	private Long id;

	private String title;

	private String artist;

	private String coverImageUrl;

	private String mrUrl;

	private int lengthInSeconds;

	@Column(nullable = false, columnDefinition = "TEXT")
	private String lyrics;

	@Builder
	public OriginalSong(String title, String artist, String coverImageUrl, String mrUrl, int lengthInSeconds,
		String lyrics) {
		this.title = title;
		this.artist = artist;
		this.coverImageUrl = coverImageUrl;
		this.mrUrl = mrUrl;
		this.lengthInSeconds = lengthInSeconds;
		this.lyrics = lyrics;
	}
}
