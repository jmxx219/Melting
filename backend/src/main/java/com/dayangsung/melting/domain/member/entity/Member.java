package com.dayangsung.melting.domain.member.entity;

import java.util.ArrayList;
import java.util.List;

import com.dayangsung.melting.domain.auth.enums.ProviderType;
import com.dayangsung.melting.domain.comment.entity.Comment;
import com.dayangsung.melting.domain.likes.entity.LikesAlbum;
import com.dayangsung.melting.domain.likes.entity.LikesSong;
import com.dayangsung.melting.domain.member.enums.Gender;
import com.dayangsung.melting.global.entity.BaseEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "member_id")
	private Long id;

	@Column(unique = true)
	private String email;

	@Enumerated(EnumType.STRING)
	private Gender gender;

	private String profileImageUrl;

	private String nickname;

	@Enumerated(EnumType.STRING)
	private ProviderType provider;

	private boolean isDeleted;

	@OneToMany(mappedBy = "member")
	private List<LikesAlbum> likesAlbums = new ArrayList<>();

	@OneToMany(mappedBy = "member")
	private List<LikesSong> likesSongs = new ArrayList<>();

	@OneToMany(mappedBy = "member")
	private List<Comment> comments = new ArrayList<>();

	private int coverCount;

	@Builder
	public Member(String email, ProviderType provider) {
		this.email = email;
		this.provider = provider;
		this.isDeleted = false;
		this.coverCount = 0;
	}

	public void initMember(Gender gender, String profileImageUrl, String nickname) {
		this.gender = gender;
		this.profileImageUrl = profileImageUrl;
		this.nickname = nickname;
	}

	public void updateMember(String profileImageUrl, String nickname) {
		this.profileImageUrl = profileImageUrl;
		this.nickname = nickname;
	}

	public void updateNickname(String nickname) {
		this.nickname = nickname;
	}

	public void updateProfileImageUrl(String profileImageUrl) {
		this.profileImageUrl = profileImageUrl;
	}

	public void increaseCoverCount() {
		this.coverCount++;
	}
}
