package com.dayangsung.melting.global.common.service;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AwsS3Service {

	@Value("${cloud.aws.s3.bucket}")
	private String bucket;

	private final AmazonS3 amazonS3;

	public String uploadFileToS3(MultipartFile multipartFile, String bucketFolderPath, Long id) throws IOException {
		String originalFilename = multipartFile.getOriginalFilename();
		String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
		String s3FileName = id + extension;

		ObjectMetadata metadata = new ObjectMetadata();
		metadata.setContentLength(multipartFile.getSize());
		metadata.setContentType(multipartFile.getContentType());

		amazonS3.putObject(bucket + bucketFolderPath, s3FileName, multipartFile.getInputStream(), metadata);
		return amazonS3.getUrl(bucket + bucketFolderPath, s3FileName).toString();
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

	public String getProfileImageUrl(Long memberId, String extension) {
		return "https://" + bucket + "/image/profile/" + memberId + extension;
	}

	public String getOriginalSongMrUrl(Long originalSongId) {
		return "https://" + bucket + "/audio/original_song/mr/" + originalSongId + ".mp3";
	}

	public String getOriginalSongVocal(Long originalSongId) {
		return "https://" + bucket + "/audio/original_song/vocal/" + originalSongId + ".mp3";
	}

	private void validateImageFileExtension(String filename) {
		int lastDotIndex = filename.lastIndexOf(".");
		if (lastDotIndex == -1) {
			throw new RuntimeException();
		}

		String extension = filename.substring(lastDotIndex + 1).toLowerCase();
		List<String> allowedExtentionList = Arrays.asList("jpg", "jpeg", "png", "gif");

		if (!allowedExtentionList.contains(extension)) {
			throw new RuntimeException();
		}
	}

	public void deleteFile(String fileName, String bucketFolderPath) {
		amazonS3.deleteObject(new DeleteObjectRequest(bucket + bucketFolderPath, fileName));
	}
}