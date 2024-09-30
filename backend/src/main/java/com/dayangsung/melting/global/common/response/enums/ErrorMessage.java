package com.dayangsung.melting.global.common.response.enums;

import lombok.Getter;

@Getter
public enum ErrorMessage {
	MEMBER_NOT_FOUND("존재하지 않는 회원입니다."),
	DUPLICATE_NICKNAME("이미 사용 중인 닉네임입니다."),
	INCORRECT_IMAGE_EXTENSION("잘못된 이미지 확장자입니다"),
	MEMBER_BAD_REQUEST("잘못된 요청입니다."),

	// ALBUM
	ALBUM_NOT_FOUND("존재하지 않는 앨범입니다."),
	INVALID_SORT_CRITERIA("올바르지 않은 정렬 기준입니다."),
	INVALID_SONG_COUNT("올바르지 않은 곡 개수입니다."),
	SEARCH_QUERY_TOO_SHORT("검색어가 너무 짧습니다. 최소 2자 이상 입력해 주세요."),
	ALBUM_NAME_BLANK_ERROR("앨범 이름은 비어있을 수 없습니다."),
	ALBUM_COVER_IMAGE_BLANK_ERROR("앨범 커버 이미지가 비어있습니다."),
	ALBUM_SONGS_EMPTY_ERROR("앨범에는 최소 1개의 곡이 필요합니다."),
	;

	private final String errorMessage;

	ErrorMessage(String errorMessage) {
		this.errorMessage = errorMessage;
	}

}