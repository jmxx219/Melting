package com.dayangsung.melting.global.common.service;

import static com.dayangsung.melting.global.common.response.enums.ErrorMessage.*;

import java.time.Duration;
import java.util.UUID;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.val;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.PutObjectPresignRequest;

@Service
@RequiredArgsConstructor
public class FileService {

	private final S3Presigner presigner;
	@Value("${spring.profiles.active}")
	private String activeProfile;
	@Value("${cloud.aws.bucket.image}")
	private String imageBucketName;
	@Value("${cloud.aws.bucket.path}")
	private String imageBucketPath;

	public String getImageSignedUrl(String fileName) {

		val regExp = "^(jpeg|png|gif|bmp)$";
		val keyName = "/" + activeProfile + imageBucketPath + "%s-%s".formatted(UUID.randomUUID().toString(), fileName);
		val splittedFileName = fileName.split("\\.");
		val extension = splittedFileName[splittedFileName.length-1].equalsIgnoreCase("jpg")
			? "jpeg" : splittedFileName[splittedFileName.length-1].toLowerCase();
		if(!Pattern.matches(regExp, extension)) {
			throw new IllegalArgumentException(INCORRECT_IMAGE_EXTENSION.getErrorMessage());
		}

		val contentType = "image/" + extension;
		val objectRequest = PutObjectRequest.builder()
			.bucket(imageBucketName)
			.key(keyName)
			.contentType(contentType)
			.build();
		val presignRequest = PutObjectPresignRequest.builder()
			.signatureDuration(Duration.ofMinutes(10))
			.putObjectRequest(objectRequest)
			.build();
		val preSignedRequest = presigner.presignPutObject(presignRequest);
		return preSignedRequest.url().toString();
	}
}
