package com.dayangsung.melting.global.exception;

import com.dayangsung.melting.global.common.enums.ErrorMessage;

import lombok.Getter;

@Getter
public class MeltingException extends RuntimeException {

	private final ErrorMessage errorMessage;

	public MeltingException(ErrorMessage errorMessage, String message) {
		super(errorMessage.getErrorMessage() + ": " + message);
		this.errorMessage = errorMessage;
	}

	public MeltingException(ErrorMessage errorMessage) {
		super(errorMessage.getErrorMessage());
		this.errorMessage = errorMessage;
	}

	@Override
	public String getMessage() {
		return super.getMessage();
	}

}
