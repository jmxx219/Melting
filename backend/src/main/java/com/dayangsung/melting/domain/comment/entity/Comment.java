package com.dayangsung.melting.domain.comment.entity;

import com.dayangsung.melting.domain.album.entity.Album;
import com.dayangsung.melting.domain.member.entity.Member;
import com.dayangsung.melting.global.entity.BaseEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Comment extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "comment_id")
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "album_id")
	private Album album;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_id")
	private Member member;

	@Column(length = 500)
	private String content;

	private boolean isDeleted;

	@Builder
	public Comment(Album album, Member member, String content) {
		this.album = album;
		this.member = member;
		this.content = content;
		this.isDeleted = false;
	}

	public void modifyContent(String content) {
		this.content = content;
	}

	public void deleteComment() {
		this.isDeleted = true;
	}
}
