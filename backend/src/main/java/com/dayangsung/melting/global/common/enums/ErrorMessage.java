package com.dayangsung.melting.global.common.enums;

import lombok.Getter;

@Getter
public enum ErrorMessage {
	MEMBER_NOT_FOUND("존재하지 않는 회원입니다."),
	DUPLICATE_NICKNAME("이미 사용 중인 닉네임입니다."),
	INCORRECT_IMAGE_EXTENSION("잘못된 이미지 확장자입니다"),

	MEMBER_BAD_REQUEST("잘못된 요청입니다."),
	MEMBER_HASHTAG_FULL("개인별 해시태그는 5개까지 등록 가능합니다."),
	MEMBER_HASHTAG_EMPTY("개인별 해시태그가 존재하지 않습니다."),
	MEMBER_HASHTAG_EXIST("추가하려는 개인별 해시태그가 이미 존재합니다"),
	MEMBER_HASHTAG_BAD_REQUEST("해시태그 내용이 존재하지 않습니다"),

	SONG_NOT_FOUND("존재하지 않는 생성곡입니다."),
	SONG_ALREADY_INCLUDED("이미 다른 앨범에 포함되어 있는 곡입니다."),

	LIKES_CANNOT_BE_NEGATIVE("좋아요 수는 음수가 될 수 없습니다."),
	ALBUM_ALREADY_LIKED("이미 좋아요 한 앨범입니다."),
	SONG_ALREADY_LIKED("이미 좋아요 한 곡입니다."),

	GENRE_NOT_FOUND("장르를 찾을 수 없습니다."),
	HASHTAG_NOT_FOUND("해시태그를 찾을 수 없습니다."),
	// ALBUM
	ALBUM_NOT_FOUND("존재하지 않는 앨범입니다."),
	INVALID_SORT_CRITERIA("올바르지 않은 정렬 기준입니다."),
	INVALID_SONG_COUNT("올바르지 않은 곡 개수입니다."),
	SEARCH_QUERY_TOO_SHORT("검색어가 너무 짧습니다. 최소 2자 이상 입력해 주세요."),
	ALBUM_NAME_BLANK_ERROR("앨범 이름은 비어있을 수 없습니다."),
	ALBUM_COVER_IMAGE_BLANK_ERROR("앨범 커버 이미지가 비어있습니다."),
	ALBUM_LIKES_NOT_FOUND("앨범 좋아요 정보를 찾을 수 없습니다."),
	REDIS_SCORE_EMPTY("조회한 redis sorted set value의 score값이 존재하지 않습니다."),
	SONG_LIKES_NOT_FOUND("곡 좋아요 정보를 찾을 수 없습니다."),

	// Song
	INVALID_FILE_TYPE("올파르지 않은 파일 형식입니다."),
	ALBUM_SONGS_EMPTY_ERROR("앨범에는 최소 1개의 곡이 필요합니다.");

	private final String errorMessage;

	ErrorMessage(String errorMessage) {
		this.errorMessage = errorMessage;
	}

}
