package com.dayangsung.melting.domain.auth.dto;

import java.util.Collection;
import java.util.List;
import java.util.Map;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

import com.dayangsung.melting.domain.auth.enums.ProviderType;

import lombok.Getter;

public class CustomOAuth2User implements OAuth2User {

	@Getter
	private final ProviderType provider;
	private final String email;

	public CustomOAuth2User(String email, ProviderType provider) {
		this.email = email;
		this.provider = provider;
	}

	@Override
	public Map<String, Object> getAttributes() {
		return Map.of();
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return List.of();
	}

	@Override
	public String getName() {
		return email;
	}
}
