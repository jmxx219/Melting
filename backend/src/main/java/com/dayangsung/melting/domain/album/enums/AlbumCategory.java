package com.dayangsung.melting.domain.album.enums;


import java.util.Arrays;
import java.util.List;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum AlbumCategory {
	SINGLE("싱글", Arrays.asList(1, 2, 3)),
	MINI("미니", Arrays.asList(4, 5, 6)),
	LP("정규", Arrays.asList(7, 8, 9, 10));

	private final String value;
	private final List<Integer> sizeList;

	public static AlbumCategory getCategoryBySongCount(int songCount) {
		// TODO: Change to custom exception
		return Arrays.stream(AlbumCategory.values())
			.filter(category -> category.sizeList.contains(songCount))
			.findFirst()
			.orElseThrow(() -> new IllegalArgumentException("올바르지 않은 곡 개수입니다."));
	}
}
