package com.dayangsung.melting.domain.member.enums;

import lombok.Getter;

@Getter
public enum Gender {
	MALE("male"),
	FEMALE("female");

	private final String gender;

	Gender(String gender) {
		this.gender = gender;
	}

}
