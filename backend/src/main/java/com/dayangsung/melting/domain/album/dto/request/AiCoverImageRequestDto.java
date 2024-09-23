package com.dayangsung.melting.domain.album.dto.request;

import lombok.Data;

@Data
public class AiCoverImageRequestDto {
	private Long id; // Member ID
	private String prompt;
}
