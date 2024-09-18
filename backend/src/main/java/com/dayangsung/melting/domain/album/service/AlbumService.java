package com.dayangsung.melting.domain.album.service;

import java.util.List;
import java.util.function.Supplier;

import org.springframework.stereotype.Service;

import com.dayangsung.melting.domain.album.dto.request.AlbumCreateRequestDto;
import com.dayangsung.melting.domain.album.dto.request.AlbumUpdateRequestDto;
import com.dayangsung.melting.domain.album.dto.response.AlbumDetailsResponseDto;
import com.dayangsung.melting.domain.album.dto.response.AlbumResponseDto;
import com.dayangsung.melting.domain.album.entity.Album;
import com.dayangsung.melting.domain.album.repository.AlbumRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AlbumService {

	private final AlbumRepository albumRepository;

	// 모든 앨범 조회
	public List<AlbumResponseDto> getAllAlbums() {
		return getAlbumsBy(albumRepository::findAll);
	}

	// 공개 설정되고, 삭제되지 않은 앨범 조회
	public List<AlbumResponseDto> getPublicAndNotDeletedAlbums() {
		return getAlbumsBy(albumRepository::findByIsPublicTrueAndIsDeletedFalse);
	}

	// 키워드 검색을 통한 앨범 조회
	public List<AlbumResponseDto> searchAlbumsByKeyword(String keyword) {
		if (keyword == null || keyword.trim().isEmpty()) {
			return getPublicAndNotDeletedAlbums();
		}
		return getAlbumsBy(() -> albumRepository.findByKeywordAndIsPublicTrueAndIsDeletedFalse(keyword));
	}

	// 공통 사용된 부분 메서드화
	private List<AlbumResponseDto> getAlbumsBy(Supplier<List<Album>> albumSupplier) {
		List<Album> albums = albumSupplier.get();
		return albums.stream()
			.map(AlbumResponseDto::of)
			.toList();
	}

	public AlbumResponseDto updateAlbum(Long albumId, AlbumUpdateRequestDto albumUpdateRequestDto) {
		// 앨범 조회
		// TODO: 예외 처리
		Album album = albumRepository.findById(albumId)
			.orElseThrow(RuntimeException::new);

		// DTO에서 받은 정보로 앨범 업데이트
		String newAlbumName = albumUpdateRequestDto.albumName();
		if (newAlbumName != null) {
			album.updateAlbumName(newAlbumName);
		}
		String newAlbumDescription = albumUpdateRequestDto.albumDescription();
		if (newAlbumDescription != null) {
			album.updateAlbumDescription(newAlbumDescription);
		}

		// 앨범 저장
		Album updatedAlbum = albumRepository.save(album);

		// 업데이트된 앨범을 DTO로 변환하여 반환
		return AlbumResponseDto.of(updatedAlbum);
	}

	public AlbumDetailsResponseDto getAlbumDetails(Long albumId) {
		// 앨범 조회
		// TODO: 예외 처리
		Album album = albumRepository.findById(albumId)
			.orElseThrow(RuntimeException::new);

		// 앨범 데이터를 DTO로 변환
		return convertToAlbumDetailsResponseDto(album);
	}


	public AlbumDetailsResponseDto createAlbum(AlbumCreateRequestDto albumCreateRequestDto) {
		// 앨범 객체 생성
		Album album = Album.builder()
			.albumName(albumCreateRequestDto.albumName())
			.category(albumCreateRequestDto.category())
			.genres(albumCreateRequestDto.genres())
			.albumDescription(albumCreateRequestDto.albumDescription())
			.albumCoverImage(albumCreateRequestDto.albumCoverImage())
			.albumLiked(0L) // 기본값을 0으로 설정
			.build();

		// 앨범 저장
		Album savedAlbum = albumRepository.save(album);

		// 저장된 앨범을 DTO로 변환하여 반환
		return convertToAlbumDetailsResponseDto(album);
	}


	// 공통 사용된 부분 메서드화
	private AlbumDetailsResponseDto convertToAlbumDetailsResponseDto(Album album) {
		return AlbumDetailsResponseDto.builder()
			.albumName(album.getAlbumName())
			.category(album.getCategory())
			.genres(album.getGenres())
			.albumDescription(album.getAlbumDescription())
			.albumCoverImage(album.getAlbumCoverImage())
			.albumLiked(album.getAlbumLiked())
			.isPublic(album.getIsPublic())
			.build();
	}

}