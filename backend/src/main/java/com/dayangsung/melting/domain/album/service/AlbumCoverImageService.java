package com.dayangsung.melting.domain.album.service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dayangsung.melting.domain.album.entity.Album;
import com.dayangsung.melting.domain.album.repository.AlbumRepository;
import com.dayangsung.melting.domain.album.service.openai.OpenAiImageService;
import com.dayangsung.melting.domain.originalsong.dto.response.OriginalSongAiResponseDto;
import com.dayangsung.melting.global.common.service.AwsS3Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AlbumCoverImageService {

	private final OpenAiImageService openAiImageService;
	private final AwsS3Service awsS3Service;
	private final AlbumRepository albumRepository;

	@Transactional
	public String createAiCoverImage(Long albumId, List<OriginalSongAiResponseDto> originalSongs) throws IOException {
		String[] result = openAiImageService.createAiCoverImage(originalSongs);
		// // S3에 저장할 시
		// String url = awsS3Service.uploadBase64ImageToS3(result[0], result[1]);
		// base64 반환 시
		String base64Image = result[0];

		// TODO: DB에 저장 로직 검토
		// saveAlbumCoverImage(albumId, result[0], result[1]);
		return base64Image;
	}

	private void saveAlbumCoverImage(Long albumId, String albumCoverImageUrl, String fileName) {

		// Album에 AI album cover image 저장
		Optional<Album> optionalAlbum = albumRepository.findById(albumId);

		if (optionalAlbum.isPresent()) {
			Album album = optionalAlbum.get();

			// 앨범의 커버 이미지 업데이트
			album.setAiAlbumCoverImage(albumCoverImageUrl);

			// 변경된 앨범 저장
			albumRepository.save(album);
		}
	}

}