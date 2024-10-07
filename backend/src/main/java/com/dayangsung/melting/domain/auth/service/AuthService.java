package com.dayangsung.melting.domain.auth.service;

import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.dayangsung.melting.domain.auth.CustomOAuth2User;
import com.dayangsung.melting.domain.auth.dto.response.GoogleResponse;
import com.dayangsung.melting.domain.auth.dto.response.KakaoResponse;
import com.dayangsung.melting.domain.auth.dto.response.OAuth2Response;
import com.dayangsung.melting.domain.auth.enums.ProviderType;
import com.dayangsung.melting.domain.member.entity.Member;
import com.dayangsung.melting.domain.member.repository.MemberRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService extends DefaultOAuth2UserService {

	private final MemberRepository memberRepository;

	@Override
	public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {

		OAuth2User oAuth2User = super.loadUser(userRequest);
		String registrationId = userRequest.getClientRegistration().getRegistrationId();

		OAuth2Response oAuth2Response;
		if (registrationId.equals(ProviderType.KAKAO.type())) {
			oAuth2Response = new KakaoResponse(oAuth2User.getAttributes());
		} else if (registrationId.equals(ProviderType.GOOGLE.type())) {
			oAuth2Response = new GoogleResponse(oAuth2User.getAttributes());
		} else {
			// TODO: 예외 처리
			return null;
		}
		Member member = insertMemberIfNotExist(oAuth2Response);
		log.debug("member info: {}, {}, {}", member.getId(), member.getEmail(), member.getProvider());

		return CustomOAuth2User.builder()
			.id(member.getId())
			.email(member.getEmail())
			.provider(member.getProvider())
			.build();
	}

	private Member insertMemberIfNotExist(OAuth2Response oAuth2Response) {
		return memberRepository.findByEmail(oAuth2Response.getEmail())
			.orElseGet(() -> memberRepository.save(
				Member.builder()
					.provider(oAuth2Response.getProvider())
					.email(oAuth2Response.getEmail())
					.build()));
	}
}
