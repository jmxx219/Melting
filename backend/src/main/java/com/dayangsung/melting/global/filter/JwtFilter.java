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

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
		FilterChain filterChain) throws ServletException, IOException {

		String accessToken = CookieUtil.getCookieValue(request, "access_token");
		String refreshToken = CookieUtil.getCookieValue(request, "refresh_token");

		if (accessToken == null && refreshToken == null) {
			filterChain.doFilter(request, response);
			return;
		}

		filterChain.doFilter(request, response);
	}
}
