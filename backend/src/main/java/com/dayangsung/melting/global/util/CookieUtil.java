package com.dayangsung.melting.global.util;

import org.springframework.stereotype.Component;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class CookieUtil {

	public String getCookie(HttpServletRequest request, String cookieName) {

		String cookieValue = null;
		Cookie[] cookies = request.getCookies();

		if (cookies == null) {
			return null;
		}

		for (Cookie cookie : cookies) {
			if (cookie.getName().equals(cookieName)) {
				cookieValue = cookie.getValue();
			}
		}

		return cookieValue;
	}

	public void updateCookie(HttpServletRequest request, HttpServletResponse response, String cookieName,
		String newCookieValue) {

		Cookie[] cookies = request.getCookies();

		if (cookies == null) {
			return;
		}

		for (Cookie cookie : cookies) {
			if (cookie.getName().equals(cookieName)) {
				cookie.setMaxAge(0);
			}
		}

		response.addCookie(new Cookie(cookieName, newCookieValue));
	}

	public Cookie createCookie(String cookieName, String cookieValue) {
		Cookie cookie = new Cookie(cookieName, cookieValue);
		cookie.setMaxAge(60 * 30);
		cookie.setSecure(true);
		cookie.setPath("/");
		cookie.setHttpOnly(true);

		return cookie;
	}

	public void deleteJwtCookies(HttpServletRequest request) {

		Cookie[] cookies = request.getCookies();

		if (cookies == null) {
			return;
		}

		for (Cookie cookie : cookies) {
			if (cookie.getName().equals("access_token") || cookie.getName().equals("refresh_token")) {
				cookie.setMaxAge(0);
			}
		}
	}
}
