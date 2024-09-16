package com.dayangsung.melting.domain.song.entity;

import com.dayangsung.melting.domain.AudioFile.entity.AudioFile;
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
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

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

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "audio_file_id")
	private AudioFile file;

	@Column(nullable = false)
	private Long likedCount;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private SongType songType;

	@Builder
	public Song(OriginalSong originalSong, Member member, AudioFile file, SongType songType) {
		this.originalSong = originalSong;
		this.member = member;
		this.file = file;
		this.likedCount = 0L;
		this.songType = songType;
	}

}
