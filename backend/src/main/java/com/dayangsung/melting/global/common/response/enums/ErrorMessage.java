package com.dayangsung.melting.global.common.response.enums;

public enum ErrorMessage {
	DUPLICATE_EMAIL("이미 사용중인 이메일입니다."),
	DUPLICATE_NICKNAME("이미 사용중인 닉네임입니다.");

	private String errorMessage;

	ErrorMessage(String errorMessage) {
		this.errorMessage = errorMessage;
	}

	public String getErrorMessage() {
		return errorMessage;
	}
}
