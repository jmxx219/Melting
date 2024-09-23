package com.dayangsung.melting.global.filter;

import java.io.IOException;

import org.springframework.web.filter.OncePerRequestFilter;

import com.dayangsung.melting.global.util.CookieUtil;
import com.dayangsung.melting.global.util.JwtUtil;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

	private final JwtUtil jwtUtil;
	private final CookieUtil cookieUtil;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
		FilterChain filterChain) throws ServletException, IOException {

		String accessToken = cookieUtil.getCookie(request, "access_token");
		String refreshToken = cookieUtil.getCookie(request, "refresh_token");

		if (accessToken == null && refreshToken == null) {
			filterChain.doFilter(request, response);
			return;
		}

		if (jwtUtil.signatureValidate(accessToken) && jwtUtil.isExpired(accessToken)) {
			accessToken = jwtUtil.reissueToken(request, response, accessToken);
			if (accessToken == null) {
				filterChain.doFilter(request, response);
			}
			cookieUtil.updateCookie(request, response, "access_token", accessToken);
		}
		filterChain.doFilter(request, response);
	}
}
