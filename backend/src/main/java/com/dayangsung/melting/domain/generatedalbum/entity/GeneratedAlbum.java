package com.dayangsung.melting.domain.generatedalbum.entity;

import com.dayangsung.melting.domain.member.entity.Member;
import com.dayangsung.melting.global.entity.BaseEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Table(name = "generated_album")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class GeneratedAlbum extends BaseEntity {

	// 생성 앨범 식별자
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long generatedAlbumId;

	// 회원 식별자
	@ManyToOne
	@JoinColumn(name = "member_id", nullable = false)
	private Member member;

	// 앨범명
	@Column(nullable = false)
	private String albumName;

	// 유형
	@Column(nullable = false)
	private String category;

	// 앨범 소개
	@Lob
	private String albumDescription;

	// 앨범 커버 이미지
	@Column(nullable = false)
	private String albumCoverImage;

	// 좋아요 수
	@Column(nullable = false)
	private Long albumLiked;

	// 공개 여부
	@Column(nullable = false)
	private Boolean isPublic;

	// 삭제 여부
	@Column(nullable = false)
	private Boolean isDeleted;

	@Builder
	public GeneratedAlbum(String albumName, String category, String albumDescription, String albumCoverImage,
			Long albumLiked) {
		this.albumName = albumName;
		this.category = category;
		this.albumDescription = albumDescription;
		this.albumCoverImage = albumCoverImage;
		this.albumLiked = albumLiked;
		this.isPublic = false;
		this.isDeleted = false;
	}

}