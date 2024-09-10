package com.dayangsung.melting.global.handler;

import java.io.IOException;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.dayangsung.melting.domain.auth.dto.CustomOAuth2User;
import com.dayangsung.melting.domain.auth.dto.RedisToken;
import com.dayangsung.melting.domain.auth.repository.RedisRepository;
import com.dayangsung.melting.global.util.CookieUtil;
import com.dayangsung.melting.global.util.JwtUtil;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

	private final JwtUtil jwtUtil;
	private final CookieUtil cookieUtil;
	private static final String REDIRECT_URI = "http://localhost:8080/login";
	private final RedisRepository redisRepository;

	public LoginSuccessHandler(JwtUtil jwtUtil, CookieUtil cookieUtil, RedisRepository redisRepository) {

		this.jwtUtil = jwtUtil;
		this.cookieUtil = cookieUtil;
		this.redisRepository = redisRepository;
	}

	@Transactional
	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
		Authentication authentication) throws IOException {

		CustomOAuth2User principal = (CustomOAuth2User)authentication.getPrincipal();

		String accessToken = jwtUtil.createAccessToken(principal.getName());
		String refreshToken = jwtUtil.createRefreshToken(principal.getName());

		response.addCookie(cookieUtil.createCookie("access_token", accessToken));
		response.addCookie(cookieUtil.createCookie("refresh_token", refreshToken));

		saveRefreshTokenOnRedis(refreshToken, principal.getName());
		response.sendRedirect(REDIRECT_URI);
	}

	private void saveRefreshTokenOnRedis(String refreshToken, String email) {
		redisRepository.save(
			RedisToken.builder()
				.email(email)
				.refreshToken(refreshToken)
				.build()
		);
	}
}
