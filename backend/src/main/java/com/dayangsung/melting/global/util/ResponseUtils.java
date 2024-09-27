package com.dayangsung.melting.global.util;

import java.util.Map;

import com.dayangsung.melting.global.common.response.ApiResponse;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class ResponseUtils {
	/**
	 * 성공
	 */
	public static ApiResponse<Void> success() {
		return success(null);
	}

	public static <T> ApiResponse<Map<String, T>> success(String key, T object) {
		return success(Map.of(key, object));
	}

	public static <T> ApiResponse<T> success(T data) {
		return ApiResponse.<T>builder()
			.status("success")
			.data(data)
			.build();
	}

	/**
	 * 에러
	 */

	public static ApiResponse<Void> error(String status, String message) {
		return error(status, null, message);
	}

	public static <T> ApiResponse<T> error(String status, T data, String message) {
		return ApiResponse.<T>builder()
			.status(status)
			.data(data)
			.errorMessage(message)
			.build();
	}
}