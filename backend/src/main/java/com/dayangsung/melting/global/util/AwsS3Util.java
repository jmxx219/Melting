package com.dayangsung.melting.global.util;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.dayangsung.melting.global.common.enums.ErrorMessage;
import com.dayangsung.melting.global.exception.BusinessException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class AwsS3Util {

	@Value("${cloud.aws.s3.bucket}")
	private String bucket;
	private final AmazonS3 amazonS3;
	private static final String CLOUD_FRONT_URL = "https://d35fpwscei7sb8.cloudfront.net";

	public String getDefaultProfileImageUrl() {
		return CLOUD_FRONT_URL + "/image/profile/default_image.png";
	}

	public String getDefaultCoverImageUrl() {
		return CLOUD_FRONT_URL + "/image/generated_album_cover/default_image.png";
	}

	public String getDefaultAlbumCoverImage(Integer number) {
		return CLOUD_FRONT_URL + "/image/generated_album_cover/default_cover_image_" + number + ".png";
	}

	public void validateImageFileExtension(String filename) {
		String extension = getExtension(filename);
		List<String> allowedExtentionList = Arrays.asList(".jpg", ".jpeg", ".png", ".gif");

		if (!allowedExtentionList.contains(extension)) {
			throw new BusinessException(ErrorMessage.INCORRECT_IMAGE_EXTENSION);
		}
	}

	public String getExtension(String filename) {
		int lastDotIndex = filename.lastIndexOf(".");
		if (lastDotIndex == -1) {
			throw new BusinessException(ErrorMessage.INCORRECT_IMAGE_EXTENSION);
		}
		return filename.substring(lastDotIndex).toLowerCase();
	}

	public void deleteFile(String fileName, String bucketFolderPath) {
		amazonS3.deleteObject(new DeleteObjectRequest(bucket + bucketFolderPath, fileName));
	}

	public String getAwsS3Url(String bucketFolderPath, String fileName) {
		return CLOUD_FRONT_URL + bucketFolderPath + "/" + fileName;
	}
}
