package com.dayangsung.melting.global.handler;

import java.io.IOException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import com.dayangsung.melting.global.common.response.ApiResponse;
import com.dayangsung.melting.global.util.WebHookUtils;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class LoginFailureHandler extends SimpleUrlAuthenticationFailureHandler {

	@Override
	public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
		AuthenticationException exception) throws IOException {
		response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
		response.setCharacterEncoding("UTF-8");
		response.setContentType("text/plain;charset=UTF-8");

		ObjectMapper objectMapper = new ObjectMapper();

		response.getWriter().write(objectMapper.writeValueAsString(
			ApiResponse.error("OAuth2 Authentication Failed")
		));

		String logMessage = String.format("OAuth2 Authentication Failed: %s", exception.getMessage());
		log.error(logMessage, exception);

		WebHookUtils.sendWebHookMessage(logMessage);
	}
}
