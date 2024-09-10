package com.dayangsung.melting.domain.member.entity;

import com.dayangsung.melting.domain.auth.enums.ProviderType;
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

	private String profileImage;

	private String nickname;

	@Enumerated(EnumType.STRING)
	private ProviderType provider;

	private boolean isDeleted;

	@Builder
	public Member(String email, String profileImage, String nickname, ProviderType provider) {
		this.email = email;
		this.profileImage = profileImage;
		this.nickname = nickname;
		this.provider = provider;
		this.isDeleted = false;
	}
}
