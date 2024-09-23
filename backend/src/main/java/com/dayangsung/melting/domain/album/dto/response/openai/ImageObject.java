package com.dayangsung.melting.domain.album.dto.response.openai;


import lombok.Data;

/**
 * OpenAI API 형식과 일치하도록 작성하였음
 */

@Data
public class ImageObject {
	String b64_json;
	// String url;
	String revised_prompt;
}