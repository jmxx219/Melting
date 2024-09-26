package com.dayangsung.melting.domain.auth.dto.response;

import java.util.Map;

import com.dayangsung.melting.domain.auth.enums.ProviderType;

public class GoogleResponse implements OAuth2Response {

	private final String email;

	public GoogleResponse(Map<String, Object> attribute) {
		this.email = attribute.get("email").toString();
	}

	@Override
	public ProviderType getProvider() {
		return ProviderType.GOOGLE;
	}

	@Override
	public String getEmail() {
		return email;
	}
}
