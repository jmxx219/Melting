package com.dayangsung.melting.global.util;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class WebHookUtils {

	private static String baseUrl;
	private static String CONTENT_TYPE = "application/json";

	@Value("${mattermost-logger.base-url}")
	private String baseUrlProperty;

	@PostConstruct
	private void init() {
		WebHookUtils.baseUrl = baseUrlProperty;
		log.info("WebHook Base URL: {}", WebHookUtils.baseUrl);
	}

	public static void sendWebHookMessage(String message) {
		HttpHeaders headers = RestTemplateUtils.createHeaders(CONTENT_TYPE);

		String body = "{\"text\":\"" + message + "\"}";

		log.info("sendWebHookMessage {}", body);

		RestTemplateUtils.sendPostRequest(baseUrl, headers, body, String.class);
	}
}

