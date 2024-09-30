package com.dayangsung.melting.domain.auth.service;

import org.springframework.http.HttpStatus;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.dayangsung.melting.domain.auth.CustomOAuth2User;
import com.dayangsung.melting.domain.auth.dto.response.GoogleResponse;
import com.dayangsung.melting.domain.auth.dto.response.KakaoResponse;
import com.dayangsung.melting.domain.auth.dto.response.OAuth2Response;
import com.dayangsung.melting.domain.auth.enums.ProviderType;
import com.dayangsung.melting.domain.member.entity.Member;
import com.dayangsung.melting.domain.member.repository.MemberRepository;
import com.dayangsung.melting.global.util.CookieUtil;
import com.dayangsung.melting.global.util.JwtUtil;
import com.dayangsung.melting.global.util.RedisUtil;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService extends DefaultOAuth2UserService {

	private final MemberRepository memberRepository;
	private final JwtUtil jwtUtil;
	private final RedisUtil redisUtil;

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

	public String reissueToken(HttpServletRequest request, HttpServletResponse response, String refreshToken) {
		// 유효기간 만료되었거나 유효하지 않으면 예외 처리
		if (!jwtUtil.validateToken(refreshToken)) {
			throw new ResponseStatusException(HttpStatus.FORBIDDEN);
		}
		String email = jwtUtil.getEmail(refreshToken);
		// 가입된 사용자인지 검증
		memberRepository.findByEmail(email).orElseThrow(RuntimeException::new);
		String storedRefreshToken = redisUtil.getRefreshToken(email);
		// 저장되어 있는 refresh token과 불일치하면 예외 처리
		if (!refreshToken.equals(storedRefreshToken)) {
			throw new ResponseStatusException(HttpStatus.FORBIDDEN);
		}
		// access Token 재발급 후 redis, 쿠키 저장
		String accessToken = jwtUtil.createAccessToken(email);
		String newRefreshToken = jwtUtil.createRefreshToken(email);
		redisUtil.saveAccessToken(email, accessToken);
		redisUtil.saveRefreshToken(email, newRefreshToken);
		CookieUtil.setCookie(response, "access_token", accessToken, 60 * 30);
		CookieUtil.setCookie(response, "refresh_token", newRefreshToken, 60 * 30);

		return newRefreshToken;
	}
}
