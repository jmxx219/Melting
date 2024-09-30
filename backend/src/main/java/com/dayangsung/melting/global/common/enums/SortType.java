package com.dayangsung.melting.global.common.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum SortType {
	LATEST("latest"),
	POPULAR("popular");

	private final String type;

}