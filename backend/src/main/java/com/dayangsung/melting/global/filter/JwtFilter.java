package com.dayangsung.melting.global.filter;

import java.io.IOException;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.server.ResponseStatusException;

import com.dayangsung.melting.global.util.CookieUtil;
import com.dayangsung.melting.global.util.JwtUtil;
import com.dayangsung.melting.global.util.RedisUtil;

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
	private final RedisUtil redisUtil;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
		FilterChain filterChain) throws ServletException, IOException {

		String accessToken = CookieUtil.getCookieValue(request, "access_token");
		String refreshToken = CookieUtil.getCookieValue(request, "refresh_token");

		log.debug("Jwt filter access_token:{}", accessToken);
		log.debug("Jwt filter refresh_token:{}", refreshToken);

		if(accessToken != null && refreshToken != null) {
			Authentication authentication = jwtUtil.getAuthentication(accessToken);
			SecurityContextHolder.getContext().setAuthentication(authentication);
			log.debug("Security Context에 '{}' 인증 정보를 저장했습니다", authentication.getPrincipal());
		}
		if (accessToken == null && refreshToken != null) {
			if (!jwtUtil.validateToken(refreshToken)) {
				throw new ResponseStatusException(HttpStatus.FORBIDDEN);
			}
			String email = jwtUtil.getEmail(refreshToken);
			String storedRefreshToken = redisUtil.getRefreshToken(email);
			// 저장되어 있는 refresh token과 불일치하면 예외 처리
			if (!refreshToken.equals(storedRefreshToken)) {
				throw new ResponseStatusException(HttpStatus.FORBIDDEN);
			}
			String newAccessToken = jwtUtil.createAccessToken(email);
			String newRefreshToken = jwtUtil.createRefreshToken(email);
			redisUtil.saveAccessToken(email, newAccessToken);
			redisUtil.saveRefreshToken(email, newRefreshToken);
			CookieUtil.setCookie(response, "access_token", newAccessToken, 60 * 30);
			CookieUtil.setCookie(response, "refresh_token", newRefreshToken, 60 * 60 * 24 * 7);
		}

		filterChain.doFilter(request, response);
	}
}
