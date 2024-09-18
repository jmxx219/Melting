package com.dayangsung.melting.domain.album.service;

import java.util.List;
import java.util.function.Supplier;

import org.springframework.stereotype.Service;

import com.dayangsung.melting.domain.album.dto.request.AlbumCreateRequestDto;
import com.dayangsung.melting.domain.album.dto.request.AlbumUpdateRequestDto;
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

	}

	public Album createAlbum(Album album) {
		return albumRepository.save(album);
	}
	
}