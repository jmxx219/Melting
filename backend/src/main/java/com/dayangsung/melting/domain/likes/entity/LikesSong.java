package com.dayangsung.melting.domain.likes.entity;

import com.dayangsung.melting.domain.member.entity.Member;
import com.dayangsung.melting.domain.song.entity.Song;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Entity
@Table(
	name = "member_likes_song",
	uniqueConstraints = {
		@UniqueConstraint(
			name = "member_likes_song_uk",
			columnNames = {"member_id", "song_id"}
		)
	}
)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class LikesSong {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "member_likes_song_id")
	private Long id;

	@Setter
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "song_id")
	private Song song;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_id")
	private Member member;

	private boolean isLiked;

	public void updateIsLiked(boolean isLiked) {
		this.isLiked = isLiked;
	}

	@Builder
	public LikesSong(Song song, Member member) {
		this.song = song;
		this.member = member;
		this.isLiked = false;
	}
}