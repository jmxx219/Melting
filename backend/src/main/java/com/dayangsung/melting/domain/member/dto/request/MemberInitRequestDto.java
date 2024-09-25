package com.dayangsung.melting.domain.member.dto.request;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record MemberInitRequestDto(
	String nickName,
	String gender
) {
}