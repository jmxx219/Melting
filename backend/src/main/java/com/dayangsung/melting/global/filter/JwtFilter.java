package com.dayangsung.melting.global.filter;

import java.io.IOException;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import com.dayangsung.melting.global.util.CookieUtil;
import com.dayangsung.melting.global.util.JwtUtil;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

	private final JwtUtil jwtUtil;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
		FilterChain filterChain) throws ServletException, IOException {

		String accessToken = CookieUtil.getCookieValue(request, "access_token");
		String refreshToken = CookieUtil.getCookieValue(request, "refresh_token");
		String email = jwtUtil.getEmail(accessToken);

		log.debug("Jwt filter access_token:{}", accessToken);
		log.debug("Jwt filter refresh_token:{}", refreshToken);

		if(accessToken != null && refreshToken != null) {
		Authentication authentication = jwtUtil.getAuthentication(accessToken);
		SecurityContextHolder.getContext().setAuthentication(authentication);
		log.debug("Security Context에 '{}' 인증 정보를 저장했습니다", authentication.getPrincipal());
		}
		filterChain.doFilter(request, response);
	}
}
