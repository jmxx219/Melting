package com.dayangsung.melting.global.common.response;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.dayangsung.melting.global.common.enums.ErrorMessage;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestControllerAdvice(basePackages = "com.dayangsung.melting")
public class ExceptionAdvice {
	@ExceptionHandler(Exception.class)
	@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
	protected ErrorResponse handleException(Exception e) {
		log.error(e.getMessage(), e);
		return ErrorResponse.builder()
			.errorMessage(ErrorMessage.valueOf(e.toString()))
			.build();
	}
}
