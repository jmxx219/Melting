package com.dayangsung.melting.domain.auth.dto.response;

import com.dayangsung.melting.domain.auth.enums.ProviderType;

public interface OAuth2Response {

	ProviderType getProvider();

	String getEmail();
}
