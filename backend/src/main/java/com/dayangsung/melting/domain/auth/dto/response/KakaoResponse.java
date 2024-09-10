package com.dayangsung.melting.domain.auth.dto.response;

import java.util.HashMap;
import java.util.Map;

import com.dayangsung.melting.domain.auth.enums.ProviderType;

public class KakaoResponse implements OAuth2Response {

	private final Map<String, Object> attribute;

	public KakaoResponse(Map<String, Object> attribute) {
		Map<String, Object> accountInfo = (Map<String, Object>)attribute.get("kakao_account");
		Map<String, Object> profile = (Map<String, Object>)accountInfo.get("profile");
		Map<String, Object> newAttribute = new HashMap<>();
		newAttribute.put("email", accountInfo.get("email"));
		newAttribute.put("profile_image", profile.get("profile_image_url"));
		newAttribute.put("nickname", profile.get("nickname"));

		this.attribute = newAttribute;
	}

	@Override
	public ProviderType getProvider() {
		return ProviderType.KAKAO;
	}

	@Override
	public String getEmail() {
		return attribute.get("email").toString();
	}

	@Override
	public String getProfileImage() {
		return attribute.get("profile_image").toString();
	}

	@Override
	public String getNickname() {
		return attribute.get("nickname").toString();
	}
}
