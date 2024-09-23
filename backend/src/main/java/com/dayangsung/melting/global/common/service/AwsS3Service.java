package com.dayangsung.melting.global.common.service;

import static com.dayangsung.melting.global.common.response.enums.ErrorMessage.*;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.AmazonS3Exception;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.S3Object;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AwsS3Service {

	@Value("${cloud.aws.s3.bucket}")
	private String bucket;
	private final AmazonS3 amazonS3;
	private static final String CLOUDFRONTURL = "https://d35fpwscei7sb8.cloudfront.net";
	private static final String MP3EXTENSION = ".mp3";

	public String uploadFileToS3(MultipartFile multipartFile, String bucketFolderPath, Long id) throws IOException {
		String originalFilename = multipartFile.getOriginalFilename();
		String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
		String s3FileName = id + extension;

		ObjectMetadata metadata = new ObjectMetadata();
		metadata.setContentLength(multipartFile.getSize());
		metadata.setContentType(multipartFile.getContentType());

		amazonS3.putObject(bucket + bucketFolderPath, s3FileName, multipartFile.getInputStream(), metadata);
		return CLOUDFRONTURL + bucketFolderPath + "/" + s3FileName;
	}

	public String uploadAlbumCoverImage(MultipartFile albumCoverImage, Long albumId) {
		return uploadImage(albumCoverImage, "/image/generated_album", albumId);
	}

	public String uploadSong(MultipartFile song, Long songId) {
		if (song.isEmpty() || Objects.isNull(song.getOriginalFilename())) {
			throw new RuntimeException();
		}
		try {
			return uploadFileToS3(song, "/audio/generated_song", songId);
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}

	public String uploadImage(MultipartFile image, String bucketFolderPath, Long id) {
		if (image.isEmpty() || Objects.isNull(image.getOriginalFilename())) {
			throw new RuntimeException();
		}
		validateImageFileExtension(image.getOriginalFilename());
		try {
			return this.uploadFileToS3(image, bucketFolderPath, id);
		} catch (IOException e) {
			throw new RuntimeException();
		}
	}

	public String uploadProfileImage(MultipartFile profileImage, Long memberId, String extension) {
		if (extension != null) {
			deleteFile(memberId + extension, "/image/profile");
		}
		return uploadImage(profileImage, "/image/profile", memberId);
	}

	public String getDefaultProfileImageUrl() {
		return CLOUDFRONTURL + "/image/profile/default_image.png";
	}

	public String getProfileImageUrl(Long memberId, String extension) {
		String profileImageUrl = CLOUDFRONTURL + "/image/profile/" + memberId + extension;
		try {
			amazonS3.getObject(bucket, profileImageUrl);
			return profileImageUrl;
		} catch (AmazonS3Exception e) {
			return getDefaultProfileImageUrl();
		}
	}

	public String getDefaultSongCoverImageUrl() {
		return CLOUDFRONTURL + "/image/generated_album_cover/default_song_cover.png";
	}

	public String getOriginalSongMrUrl(Long originalSongId) {
		return CLOUDFRONTURL + "/audio/original_song/mr/" + originalSongId + MP3EXTENSION;
	}

	public String getOriginalSongVocal(Long originalSongId) {
		return CLOUDFRONTURL + "/audio/original_song/vocal/" + originalSongId + MP3EXTENSION;
	}

	private void validateImageFileExtension(String filename) {
		int lastDotIndex = filename.lastIndexOf(".");
		if (lastDotIndex == -1) {
			throw new RuntimeException(INCORRECT_IMAGE_EXTENSION.getErrorMessage());
		}

		String extension = filename.substring(lastDotIndex + 1).toLowerCase();
		List<String> allowedExtentionList = Arrays.asList("jpg", "jpeg", "png", "gif");

		if (!allowedExtentionList.contains(extension)) {
			throw new RuntimeException(INCORRECT_IMAGE_EXTENSION.getErrorMessage());
		}
	}

	public void deleteFile(String fileName, String bucketFolderPath) {
		amazonS3.deleteObject(new DeleteObjectRequest(bucket + bucketFolderPath, fileName));
	}
}