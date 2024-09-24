package com.dayangsung.melting.domain.album.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum AlbumSortType {
	LATEST("latest"),
	POPULAR("popular");

	private final String type;

}