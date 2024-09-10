package com.dayangsung.melting.domain.auth.dto.response;

import java.util.Map;

import com.dayangsung.melting.domain.auth.enums.ProviderType;

public class GoogleResponse implements OAuth2Response {

	private final Map<String, Object> attribute;

	public GoogleResponse(Map<String, Object> attribute) {
		this.attribute = attribute;
	}

	@Override
	public ProviderType getProvider() {
		return ProviderType.GOOGLE;
	}

	@Override
	public String getEmail() {
		return attribute.get("email").toString();
	}

	@Override
	public String getProfileImage() {
		return attribute.get("picture").toString();
	}

	@Override
	public String getNickname() {
		return attribute.get("name").toString();
	}
}
