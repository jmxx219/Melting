package com.dayangsung.melting.global.util;

import static com.dayangsung.melting.global.common.enums.ErrorMessage.*;

import java.net.URI;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import com.dayangsung.melting.global.exception.MeltingException;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class RestTemplateUtils {

	static final String CONTENT_TYPE = "Content-Type";
	static final String AUTHORIZATION = "Authorization";
	static final String BEARER = "Bearer ";

	private static final RestTemplate restTemplate = new RestTemplate();

	public static HttpHeaders createHeaders(String contentType, String token) {
		HttpHeaders headers = new HttpHeaders();
		headers.set(CONTENT_TYPE, contentType);
		headers.set(AUTHORIZATION, BEARER + token);
		return headers;
	}

	public static HttpHeaders createHeaders(String contentType) {
		HttpHeaders headers = new HttpHeaders();
		headers.set(CONTENT_TYPE, contentType);
		return headers;
	}

	public static <T> ResponseEntity<T> sendGetRequest(String url, HttpHeaders headers, Class<T> responseType) {
		HttpEntity<String> entity = new HttpEntity<>(headers);
		try {
			return restTemplate.exchange(url, HttpMethod.GET, entity, responseType);
		} catch (HttpClientErrorException e) {
			if (e.getStatusCode().is4xxClientError()) {
				return ResponseEntity.status(e.getStatusCode()).build();
			} else {
				throw new MeltingException(EXTERNAL_BAD_REQUEST);
			}
		}
	}

	public static <T> ResponseEntity<T> sendGetRequestWithUri(URI uri, HttpHeaders headers, Class<T> responseType) {
		HttpEntity<String> entity = new HttpEntity<>(headers);
		try {
			return restTemplate.exchange(uri, HttpMethod.GET, entity, responseType);
		} catch (HttpClientErrorException e) {
			if (e.getStatusCode().is4xxClientError()) {
				return ResponseEntity.status(e.getStatusCode()).build();
			} else {
				throw new MeltingException(EXTERNAL_BAD_REQUEST);
			}
		}
	}

	public static <T> ResponseEntity<T> sendPostRequest(String url, HttpHeaders headers, String body,
		Class<T> responseType) {
		HttpEntity<String> entity = new HttpEntity<>(body, headers);
		try {
			return restTemplate.exchange(url, HttpMethod.POST, entity, responseType);
		} catch (HttpClientErrorException e) {
			throw new MeltingException(EXTERNAL_BAD_REQUEST);
		}
	}
}
