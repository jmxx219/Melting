package com.dayangsung.melting.domain.album.dto.response.openai;


import com.fasterxml.jackson.annotation.JsonProperty;

public record ImageObject(
		@JsonProperty("b64_json") String b64Json,
		@JsonProperty("revised_prompt") String revisedPrompt) {
}