package com.dayangsung.melting.global.handler;

import java.io.IOException;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.dayangsung.melting.domain.auth.dto.CustomOAuth2User;
import com.dayangsung.melting.global.util.CookieUtil;
import com.dayangsung.melting.global.util.JwtUtil;
import com.dayangsung.melting.global.util.RedisUtil;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

	private final JwtUtil jwtUtil;
	private final CookieUtil cookieUtil;
	private static final String REDIRECT_URI = "http://localhost:8080/login";
	private final RedisUtil redisUtil;

	public LoginSuccessHandler(JwtUtil jwtUtil, CookieUtil cookieUtil, RedisUtil redisUtil) {

		this.jwtUtil = jwtUtil;
		this.cookieUtil = cookieUtil;
		this.redisUtil = redisUtil;
	}

	@Transactional
	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
		Authentication authentication) throws IOException {

		CustomOAuth2User principal = (CustomOAuth2User)authentication.getPrincipal();

		String accessToken = jwtUtil.createAccessToken(principal.getName());
		String refreshToken = jwtUtil.createRefreshToken();

		response.addCookie(cookieUtil.createCookie("access_token", accessToken));
		response.addCookie(cookieUtil.createCookie("refresh_token", refreshToken));

		redisUtil.saveRefreshToken(accessToken, refreshToken);
		response.sendRedirect(REDIRECT_URI);
	}
}
