package com.dayangsung.melting.domain.hashtag.dto.response;

import com.dayangsung.melting.domain.hashtag.entity.Hashtag;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

import lombok.Builder;

@Builder
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record HashtagResponseDto(
		String id,
		String content
) {
	public static HashtagResponseDto of(Hashtag hashtag) {
		return HashtagResponseDto.builder()
				.id(hashtag.getId().toString())
				.content(hashtag.getContent())
				.build();
	}
}
