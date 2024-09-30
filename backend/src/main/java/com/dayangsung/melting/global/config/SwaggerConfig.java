package com.dayangsung.melting.global.config;

import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;

@Configuration
public class SwaggerConfig {

	@Bean
	public OpenAPI openAPI() {
		return new OpenAPI()
			.info(new Info()
				.version("v1.0")
				.title("Melting Rest API")
				.description("melting"));
	}

	@Bean
	GroupedOpenApi allApi() {
		return GroupedOpenApi.builder().group("all").pathsToMatch("/api/v1/**").build();
	}

	@Bean
	GroupedOpenApi voiceApi() {
		return GroupedOpenApi.builder().group("voice").pathsToMatch("/api/v1/members/me/voices").build();
	}

	@Bean
	GroupedOpenApi membersApi() {
		return GroupedOpenApi.builder().group("members").pathsToMatch("/api/v1/members/*").build();
	}

	@Bean
	GroupedOpenApi albumsApi() {
		return GroupedOpenApi.builder().group("albums").pathsToMatch("/api/v1/albums/*", "/api/v1/albums").build();
	}

	@Bean
	GroupedOpenApi songsApi() {
		return GroupedOpenApi.builder().group("songs").pathsToMatch("/api/v1/songs/*").build();
	}

	@Bean
	GroupedOpenApi originalSongsApi() {
		return GroupedOpenApi.builder().group("original-songs").pathsToMatch("/api/v1/original-songs/**").build();
	}

	@Bean
	GroupedOpenApi likesApi() {
		return GroupedOpenApi.builder().group("likes").pathsToMatch("/api/v1/*/*/likes").build();
	}

	@Bean
	GroupedOpenApi commentsApi() {
		return GroupedOpenApi.builder().group("comments").pathsToMatch("/api/v1/albums/*/comments/**").build();
	}
}