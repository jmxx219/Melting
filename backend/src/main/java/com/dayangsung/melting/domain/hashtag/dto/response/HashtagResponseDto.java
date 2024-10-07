package com.dayangsung.melting.domain.hashtag.dto.response;

import com.dayangsung.melting.domain.hashtag.entity.HashtagDocument;
import com.dayangsung.melting.domain.hashtag.entity.Hashtag;

import lombok.Builder;

@Builder
public record HashtagResponseDto(
	Long id,
	String content
) {
	public static HashtagResponseDto of(Hashtag hashtag) {
		return HashtagResponseDto.builder()
			.id(hashtag.getId())
			.content(hashtag.getContent())
			.build();
	}

	public static HashtagResponseDto of(HashtagDocument hashtagDocument) {
		return HashtagResponseDto.builder()
			.id(hashtagDocument.getId())
			.content(hashtagDocument.getContent())
			.build();
	}
}
