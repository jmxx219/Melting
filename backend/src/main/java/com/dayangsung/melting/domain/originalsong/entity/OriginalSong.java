package com.dayangsung.melting.domain.originalsong.entity;

import com.dayangsung.melting.domain.member.enums.Gender;
import com.dayangsung.melting.global.entity.BaseEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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

	@Enumerated(EnumType.STRING)
	private Gender artistGender;

	private String coverImageUrl;

	private String mrUrl;

	private String voiceUrl;

	@Column(nullable = false, columnDefinition = "TEXT")
	private String lyrics;

	@Builder
	public OriginalSong(String title, String artist, Gender artistGender, String coverImageUrl, String mrUrl, String voiceUrl, String lyrics) {
		this.title = title;
		this.artist = artist;
		this.artistGender = artistGender;
		this.coverImageUrl = coverImageUrl;
		this.mrUrl = mrUrl;
		this.lyrics = lyrics;
	}
}
