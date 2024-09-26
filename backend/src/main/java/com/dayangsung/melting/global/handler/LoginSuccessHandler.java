package com.dayangsung.melting.global.handler;

import static com.dayangsung.melting.domain.auth.repository.HttpCookieOAuth2AuthorizationRequestRepository.*;

import java.io.IOException;
import java.util.Optional;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.util.UriComponentsBuilder;

import com.dayangsung.melting.domain.auth.CustomOAuth2User;
import com.dayangsung.melting.domain.auth.repository.HttpCookieOAuth2AuthorizationRequestRepository;
import com.dayangsung.melting.domain.member.entity.Member;
import com.dayangsung.melting.domain.member.repository.MemberRepository;
import com.dayangsung.melting.global.util.CookieUtil;
import com.dayangsung.melting.global.util.JwtUtil;
import com.dayangsung.melting.global.util.RedisUtil;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

	private final JwtUtil jwtUtil;
	private final HttpCookieOAuth2AuthorizationRequestRepository httpCookieOAuth2AuthorizationRequestRepository;
	private final RedisUtil redisUtil;
	private final MemberRepository memberRepository;

	@Transactional
	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
		Authentication authentication) throws IOException {

		CustomOAuth2User principal = (CustomOAuth2User)authentication.getPrincipal();
		String email = principal.getName();

		String accessToken = jwtUtil.createAccessToken(email);
		String refreshToken = jwtUtil.createRefreshToken(email);

		CookieUtil.setCookie(response, "access_token", accessToken, 60 * 30);
		CookieUtil.setCookie(response, "refresh_token", refreshToken, 60 * 30);

		redisUtil.saveAccessToken(email, accessToken);
		redisUtil.saveRefreshToken(email, refreshToken);
		String determinedTargetUrl = determineTargetUrl(request, response, authentication);
		Member member = memberRepository.findByEmail(email).orElseThrow(RuntimeException::new);
		if (member.getGender() == null || member.getNickname() == null) {
			determinedTargetUrl += "?init=true";
		}
		clearAuthenticationAttributes(request, response);
		response.sendRedirect(determinedTargetUrl);
	}

	protected String determineTargetUrl(HttpServletRequest request, HttpServletResponse response,
		Authentication authentication) {
		Optional<String> redirectUri = CookieUtil.resolveCookie(request, REDIRECT_URL_PARAM_COOKIE_NAME)
			.map(Cookie::getValue);
		String targetUrl = redirectUri.orElse(getDefaultTargetUrl());

		return UriComponentsBuilder.fromUriString(targetUrl)
			.build()
			.toUriString();
	}

	protected void clearAuthenticationAttributes(HttpServletRequest request, HttpServletResponse response) {
		super.clearAuthenticationAttributes(request);
		httpCookieOAuth2AuthorizationRequestRepository.clearCookies(request, response);
	}
}
