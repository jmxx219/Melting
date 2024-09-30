package com.dayangsung.melting.domain.auth.contoller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dayangsung.melting.domain.auth.dto.request.ReissueRequestDto;
import com.dayangsung.melting.domain.auth.service.AuthService;
import com.dayangsung.melting.global.common.response.ApiResponse;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/v1/members")
@RequiredArgsConstructor
public class AuthController {

	private final AuthService authService;

	@PostMapping("/reissue")
	public ApiResponse<String> reissue(HttpServletRequest request, HttpServletResponse response,
		@RequestBody ReissueRequestDto reissueRequestDto) {
		String newRefreshToken = authService.reissueToken(request, response, reissueRequestDto.refreshToken());
		return ApiResponse.ok(newRefreshToken);
	}
}

