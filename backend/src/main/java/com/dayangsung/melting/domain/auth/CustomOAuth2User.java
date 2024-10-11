package com.dayangsung.melting.domain.auth;

import java.util.Collection;
import java.util.List;
import java.util.Map;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

import com.dayangsung.melting.domain.auth.enums.ProviderType;

import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

@ToString
@RequiredArgsConstructor
public class CustomOAuth2User implements OAuth2User {

	@Getter
	private Long id;

	private final String email;

	@Getter
	private final ProviderType provider;

	@Builder
	public CustomOAuth2User(Long id, String email, ProviderType provider) {
		this.id = id;
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
