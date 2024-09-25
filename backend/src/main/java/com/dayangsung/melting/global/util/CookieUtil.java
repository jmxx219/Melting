package com.dayangsung.melting.global.util;

import java.util.Base64;
import java.util.Objects;
import java.util.Optional;

import org.apache.commons.lang3.StringUtils;
import org.springframework.security.oauth2.core.endpoint.OAuth2AuthorizationRequest;
import org.springframework.util.SerializationUtils;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public interface CookieUtil {

	/** request에 담겨있는 쿠키 반환**/
	static Optional<Cookie> resolveCookie(HttpServletRequest request, String cookieName) {
		Cookie[] cookies = request.getCookies();

		if (cookies != null && cookies.length > 0) {
			for (Cookie cookie : cookies) {
				if (cookie.getName().equals(cookieName)) {
					return Optional.of(cookie);
				}
			}
		}

		return Optional.empty();
	}

	static String getCookieValue(HttpServletRequest request, String cookieName) {
		return resolveCookie(request, cookieName)
			.map(Cookie::getValue)
			.orElse(null);
	}

	/** 쿠키를 삭제하는 작업: maxAge를 0으로 설정해서 브라우저가 파기하도록 함 **/
	static void deleteCookie(HttpServletRequest request, HttpServletResponse response, String cookieName) {
		Optional<Cookie> optionalCookie = resolveCookie(request, cookieName);
		if (optionalCookie.isPresent()) {
			Cookie cookie = optionalCookie.get();
			cookie.setValue("");
			cookie.setPath("/");
			cookie.setMaxAge(0);
			response.addCookie(cookie);
		}
	}

	/**
	 * @param response 응답에 쿠키를 적어서 보내줌
	 * @param cookieName key
	 * @param cookieContents value
	 * @param maxAge 초 단위
	 */
	static void setCookie(HttpServletResponse response,
		String cookieName, String cookieContents, int maxAge) {
		Cookie cookie = new Cookie(cookieName, cookieContents);
		cookie.setHttpOnly(true);
		cookie.setMaxAge(maxAge);
		cookie.setPath("/");
		response.addCookie(cookie);
	}

	/**
	 * @param request OAuth2AuthorizationRequest
	 * @return 브라우저 쿠키에 담기 위해 OAuth2AuthorizationRequest를 string 으로 변환
	 */
	static String serialize(OAuth2AuthorizationRequest request) {
		return Base64.getUrlEncoder().encodeToString(SerializationUtils.serialize(request));
	}

	/**
	 * @param cookie HttpServletRequest로부터 resolve 한 쿠키
	 * @param clz 반환 타입
	 * @return string 으로 쿠키의 값을 clz 타입으로 반환
	 */
	static <T> T deserialize(Cookie cookie, Class<T> clz) {
		if (isDeleted(cookie))
			return null;
		return clz.cast(SerializationUtils.deserialize(
			Base64.getUrlDecoder().decode(cookie.getValue()))
		);
	}

	private static boolean isDeleted(Cookie cookie) {
		return StringUtils.isBlank(cookie.getValue()) || Objects.isNull(cookie.getValue());
	}
}
