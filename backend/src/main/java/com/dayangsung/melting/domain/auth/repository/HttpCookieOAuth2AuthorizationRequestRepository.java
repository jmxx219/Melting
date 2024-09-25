package com.dayangsung.melting.domain.auth.repository;

import org.apache.commons.lang3.StringUtils;
import org.springframework.security.oauth2.client.web.AuthorizationRequestRepository;
import org.springframework.security.oauth2.core.endpoint.OAuth2AuthorizationRequest;
import org.springframework.stereotype.Component;

import com.dayangsung.melting.global.util.CookieUtil;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class HttpCookieOAuth2AuthorizationRequestRepository
	implements AuthorizationRequestRepository<OAuth2AuthorizationRequest> {

	public static final String OAUTH2_AUTHORIZATION_REQUEST_COOKIE_NAME = "oauth2_auth_request";
	public static final String REDIRECT_URL_PARAM_COOKIE_NAME = "redirect_url";
	private static final int cookieExpireSeconds = 180;

	@Override
	public OAuth2AuthorizationRequest loadAuthorizationRequest(HttpServletRequest request) {
		return CookieUtil.resolveCookie(request, OAUTH2_AUTHORIZATION_REQUEST_COOKIE_NAME)
			.map(cookie -> CookieUtil.deserialize(cookie, OAuth2AuthorizationRequest.class))
			.orElse(null);
	}

	@Override
	public void saveAuthorizationRequest(
		OAuth2AuthorizationRequest authorizationRequest,
		HttpServletRequest request,
		HttpServletResponse response) {
		if (authorizationRequest == null) {
			CookieUtil.deleteCookie(request, response, OAUTH2_AUTHORIZATION_REQUEST_COOKIE_NAME);
			CookieUtil.deleteCookie(request, response, REDIRECT_URL_PARAM_COOKIE_NAME);
			return;
		}
		CookieUtil.setCookie(
			response,
			OAUTH2_AUTHORIZATION_REQUEST_COOKIE_NAME,
			CookieUtil.serialize(authorizationRequest),
			cookieExpireSeconds);
		String redirectUrlAfterLogin = request.getParameter(REDIRECT_URL_PARAM_COOKIE_NAME);
		if (StringUtils.isNotBlank(redirectUrlAfterLogin)) {
			CookieUtil.setCookie(response, REDIRECT_URL_PARAM_COOKIE_NAME, redirectUrlAfterLogin, cookieExpireSeconds);
		}
	}

	/** OAuth2AuthorizationRequest를 쿠키에서 제거 **/
	@Override
	public OAuth2AuthorizationRequest removeAuthorizationRequest(
		HttpServletRequest request, HttpServletResponse response) {

		// 쿠키 삭제하기 전에 쿠키 문자열을 객체로 변환
		OAuth2AuthorizationRequest authorizationRequest = this.loadAuthorizationRequest(request);
		CookieUtil.deleteCookie(request, response, OAUTH2_AUTHORIZATION_REQUEST_COOKIE_NAME);

		return authorizationRequest;
	}

	/** redirect_url이 담긴 쿠키는 인증이 완전히 완료된 후에 제거되어야함 **/
	public void clearCookies(HttpServletRequest request, HttpServletResponse response) {
		CookieUtil.deleteCookie(request, response, OAUTH2_AUTHORIZATION_REQUEST_COOKIE_NAME);
		CookieUtil.deleteCookie(request, response, REDIRECT_URL_PARAM_COOKIE_NAME);
	}
}