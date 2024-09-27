package com.dayangsung.melting.global.handler;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import com.dayangsung.melting.global.common.response.ApiResponse;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {
	@Override
	public void commence(HttpServletRequest request,
		HttpServletResponse response,
		AuthenticationException authException) throws IOException {
		// 유효한 자격증명을 제공하지 않고 접근하려 할때 401 에러 리턴
		setErrorResponse(request, response, authException);
	}

	private void setErrorResponse(HttpServletRequest request, HttpServletResponse response, Throwable ex) {
		response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
		response.setContentType(MediaType.APPLICATION_JSON_VALUE);
		response.setCharacterEncoding("UTF-8");

		ObjectMapper objectMapper = new ObjectMapper();

		Map<String, Object> data = new HashMap<>();
		Map<String, Object> error = new HashMap<>();
		error.put("status", HttpServletResponse.SC_UNAUTHORIZED);
		error.put("message", ex.getMessage());
		error.put("path", request.getServletPath());
		data.put("error", error);

		try {
			response.getWriter().write(objectMapper.writeValueAsString(
				ApiResponse.error("Unauthorized - TOKEN_NOT_EXIST")
			));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
