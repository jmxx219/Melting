package com.dayangsung.melting.global.exception;

import com.dayangsung.melting.global.common.enums.ErrorMessage;

import lombok.Getter;

@Getter
public class BusinessException extends MeltingException {
	public BusinessException(ErrorMessage errorMessage, String message) {
		super(errorMessage, message);
	}

	public BusinessException(ErrorMessage errorMessage) {
		super(errorMessage);
	}
}
