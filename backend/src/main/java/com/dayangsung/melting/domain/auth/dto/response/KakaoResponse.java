package com.dayangsung.melting.domain.auth.dto.response;

import java.util.HashMap;
import java.util.Map;

import com.dayangsung.melting.domain.auth.enums.ProviderType;

public class KakaoResponse implements OAuth2Response {

	private final String email;

	public KakaoResponse(Map<String, Object> attribute) {
		Map<String, Object> accountInfo = (Map<String, Object>)attribute.get("kakao_account");
		this.email =  accountInfo.get("email").toString();
	}

	@Override
	public ProviderType getProvider() {
		return ProviderType.KAKAO;
	}

	@Override
	public String getEmail() {
		return email;
	}
}
