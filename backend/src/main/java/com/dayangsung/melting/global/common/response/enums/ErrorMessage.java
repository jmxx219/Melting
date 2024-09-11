package com.dayangsung.melting.global.common.response.enums;

public enum ErrorMessage {
	MEMBER_NOT_FOUND("존재하지 않는 회원입니다."),
	DUPLICATE_NICKNAME("이미 사용 중인 닉네임입니다."),
	INCORRECT_IMAGE_EXTENSION("잘못된 이미지 확장자입니다");

	private String errorMessage;

	ErrorMessage(String errorMessage) {
		this.errorMessage = errorMessage;
	}

	public String getErrorMessage() {
		return errorMessage;
	}
}
