package com.dayangsung.melting.domain.likes.entity;

import com.dayangsung.melting.domain.album.entity.Album;
import com.dayangsung.melting.domain.member.entity.Member;

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
	name = "member_likes_album",
	uniqueConstraints = {
		@UniqueConstraint(
			name = "member_likes_album_uk",
			columnNames = {"member_id", "album_id"}
		)
	}
)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class LikesAlbum {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "member_likes_album_id")
	private Long id;

	@Setter
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "album_id")
	private Album album;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_id")
	private Member member;

	private boolean isLiked;

	public void updateIsLiked(boolean isLiked) {
		this.isLiked = isLiked;
	}

	@Builder
	public LikesAlbum(Album album, Member member) {
		this.album = album;
		this.member = member;
		this.isLiked = false;
	}
}