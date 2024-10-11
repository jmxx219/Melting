package com.dayangsung.melting.domain.auth.enums;

public enum ProviderType {
	KAKAO("kakao"),
	GOOGLE("google");

	private final String type;

	ProviderType(String type) {
		this.type = type;
	}

	public String type() {
		return type;
	}
}
