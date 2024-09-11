package com.dayangsung.melting.global.common.response;

import com.dayangsung.melting.global.common.response.enums.ErrorMessage;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class ErrorResponse {
	private ErrorMessage errorMessage;
}
