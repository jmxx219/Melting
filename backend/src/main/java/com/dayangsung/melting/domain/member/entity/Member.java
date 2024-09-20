package com.dayangsung.melting.domain.member.entity;

import com.dayangsung.melting.domain.auth.enums.ProviderType;
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
public class Member extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "member_id")
	private Long id;

	@Column(unique = true)
	private String email;

	@Enumerated(EnumType.STRING)
	private Gender gender;

	private String profileImageExtension;

	private String nickname;

	@Enumerated(EnumType.STRING)
	private ProviderType provider;

	private boolean isDeleted;

	@Builder
	public Member(String email, ProviderType provider) {
		this.email = email;
		this.provider = provider;
		this.isDeleted = false;
	}

	public void initMember(Gender gender, String profileImageExtension, String nickname) {
		this.gender = gender;
		this.profileImageExtension = profileImageExtension;
		this.nickname = nickname;
	}

	public void updateMember(String profileImageExtension, String nickname) {
		this.profileImageExtension = profileImageExtension;
		this.nickname = nickname;
	}

	public void updateNickname(String nickname) {
		this.nickname = nickname;
	}

	public void updateProfileImageExtension(String profileImageExtension) {
		this.profileImageExtension = profileImageExtension;
	}
}
