package com.dayangsung.melting.global.common.service;

import static com.dayangsung.melting.global.common.enums.ErrorMessage.*;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.dayangsung.melting.domain.member.repository.MemberRepository;
import com.dayangsung.melting.global.common.enums.ErrorMessage;
import com.dayangsung.melting.global.exception.BusinessException;
import com.dayangsung.melting.global.util.AwsS3Util;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AwsS3Service {

	@Value("${cloud.aws.s3.bucket}")
	private String bucket;
	private final AmazonS3 amazonS3;
	private final AwsS3Util awsS3Util;
	private final MemberRepository memberRepository;

	public String uploadFileToS3(MultipartFile multipartFile, String bucketFolderPath, String id) throws IOException {
		String originalFilename = multipartFile.getOriginalFilename();
		String extension = awsS3Util.getExtension(originalFilename);
		String filename = id + extension;

		ObjectMetadata metadata = new ObjectMetadata();
		metadata.setContentLength(multipartFile.getSize());
		metadata.setContentType(multipartFile.getContentType());

		amazonS3.putObject(bucket + bucketFolderPath, filename, multipartFile.getInputStream(), metadata);
		return awsS3Util.getAwsS3Url(bucketFolderPath, filename);
	}

	public String uploadVoice(MultipartFile voice, Long memberId, Long originalSongId) {
		String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
		String id = String.format("m%d_os%d_%s", memberId, originalSongId, timestamp);

		if (voice.isEmpty() || Objects.isNull(voice.getOriginalFilename())) {
			throw new BusinessException(ErrorMessage.FILE_IS_EMPTY);
		}
		try {
			return uploadFileToS3(voice, "/audio/member_voice", id);
		} catch (IOException e) {
			throw new BusinessException(ErrorMessage.FILE_UPLOAD_FAILED);
		}
	}

	public String uploadImage(MultipartFile image, String bucketFolderPath, Long id) {
		awsS3Util.validateImageFileExtension(image.getOriginalFilename());
		try {
			return this.uploadFileToS3(image, bucketFolderPath, id.toString());
		} catch (IOException e) {
			throw new BusinessException(ErrorMessage.FILE_UPLOAD_FAILED);
		}
	}

	public String uploadProfileImage(MultipartFile profileImage, Long memberId) {
		String profileImageUrl = memberRepository.findById(memberId)
			.orElseThrow(() -> new BusinessException(ErrorMessage.MEMBER_NOT_FOUND)).getProfileImageUrl();
		if (profileImageUrl != null) {
			String extension = awsS3Util.getExtension(profileImageUrl);
			awsS3Util.deleteFile(memberId + extension, "/image/profile");
		}
		return uploadImage(profileImage, "/image/profile", memberId);
	}

	public String uploadAlbumCoverImage(MultipartFile albumCoverImage, Long albumId) {
		return uploadImage(albumCoverImage, "/image/generated_album_cover", albumId);
	}
}