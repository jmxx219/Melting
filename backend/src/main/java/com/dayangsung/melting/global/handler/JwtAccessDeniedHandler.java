package com.dayangsung.melting.global.handler;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.MediaType;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import com.dayangsung.melting.global.common.response.ApiResponse;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAccessDeniedHandler implements AccessDeniedHandler {
	@Override
	public void handle(HttpServletRequest request, HttpServletResponse response,
		AccessDeniedException accessDeniedException) throws IOException {
		//필요한 권한 없이 접근하려 할때 403 리턴
		setErrorResponse(request, response, accessDeniedException);
	}

	private void setErrorResponse(HttpServletRequest request, HttpServletResponse response, Throwable ex) {
		response.setStatus(HttpServletResponse.SC_FORBIDDEN);
		response.setContentType(MediaType.APPLICATION_JSON_VALUE);
		response.setCharacterEncoding("UTF-8");

		ObjectMapper objectMapper = new ObjectMapper();

		try {
			response.getWriter().write(objectMapper.writeValueAsString(
				"forbidden"
			));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
