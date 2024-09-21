package com.dayangsung.melting.domain.album.service;

import java.util.List;
import java.util.function.Supplier;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dayangsung.melting.domain.album.dto.request.AlbumCreateRequestDto;
import com.dayangsung.melting.domain.album.dto.request.AlbumUpdateRequestDto;
import com.dayangsung.melting.domain.album.dto.response.AlbumDetailsResponseDto;
import com.dayangsung.melting.domain.album.dto.response.AlbumMainResponseDto;
import com.dayangsung.melting.domain.album.dto.response.AlbumSearchResponseDto;
import com.dayangsung.melting.domain.album.dto.response.AlbumUpdateResponseDto;
import com.dayangsung.melting.domain.album.entity.Album;
import com.dayangsung.melting.domain.album.repository.AlbumRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AlbumService {

	private final AlbumRepository albumRepository;

	// 모든 앨범 조회
	public List<AlbumSearchResponseDto> getAllAlbums() {
		return getAlbumsBy(albumRepository::findAll);
	}

	// 커뮤니티 메인에서 사용. sort 파라미터에 따라 앨범 목록을 정렬하여 반환하는 메서드
	public List<AlbumMainResponseDto> getAlbumsSorted(String sort) {
		List<Album> albums;

		// popular: 인기순으로 정렬, latest: 최신순으로 정렬
		if ("popular".equalsIgnoreCase(sort)) {
			albums = albumRepository.findByIsPublicTrueAndIsDeletedFalseOrderByLikedCountDesc();
		} else if ("latest".equalsIgnoreCase(sort)) {
			albums = albumRepository.findByIsPublicTrueAndIsDeletedFalseOrderByCreatedAtDesc();
		} else {
			// TODO: 예외 처리 수정
			throw new IllegalArgumentException("유효하지 않은 정렬 기준입니다.");
		}

		// 앨범을 DTO로 변환하여 반환
		return albums.stream()
				.map(AlbumMainResponseDto::of)
				.toList();
	}

	// 앨범명 검색을 통한 앨범 조회
	public List<AlbumSearchResponseDto> searchAlbumsByAlbumName(String keyword) {
		validateKeyword(keyword);
		return getAlbumsBy(() -> albumRepository.findAlbumsByAlbumName(keyword));
	}

	// 곡명 검색을 통한 앨범 조회
	public List<AlbumSearchResponseDto> searchAlbumsBySongName(String keyword) {
		validateKeyword(keyword);
		return getAlbumsBy(() -> albumRepository.findAlbumsBySongName(keyword));
	}
	
	// 해시태그 내용 검색을 통한 앨범 조회
	public List<AlbumSearchResponseDto> searchAlbumsByHashtag(String keyword) {
		validateKeyword(keyword);
		return getAlbumsBy(() -> albumRepository.findAlbumsByHashtag(keyword));
	}
	
	// 장르 검색을 통한 앨범 조회
	public List<AlbumSearchResponseDto> searchAlbumsByGenre(String keyword) {
		validateKeyword(keyword);
		return getAlbumsBy(() -> albumRepository.findAlbumsByGenre(keyword));
	}

	// 검색에서 공통 사용된 예외 처리 부분 메서드화
	private void validateKeyword(String keyword) {
		if (keyword == null || keyword.trim().length() < 2) {
			// TODO: 예외 처리 수정
			throw new IllegalArgumentException("최소 2자 이상 입력해 주세요.");
		}
	}

	// 검색에서 공통 사용된 부분 메서드화
	private List<AlbumSearchResponseDto> getAlbumsBy(Supplier<List<Album>> albumSupplier) {
		List<Album> albums = albumSupplier.get();
		return albums.stream()
			.map(AlbumSearchResponseDto::of)
			.toList();
	}

	public AlbumDetailsResponseDto getAlbumDetails(Long albumId) {
		// 앨범 조회
		// TODO: 예외 처리
		Album album = albumRepository.findById(albumId)
				.orElseThrow(RuntimeException::new);

		// 앨범 데이터를 DTO로 변환
		return AlbumDetailsResponseDto.of(album);
	}
	
	// TODO: 수정 필요
	@Transactional
	public AlbumUpdateResponseDto updateAlbum(Long albumId, AlbumUpdateRequestDto albumUpdateRequestDto) {
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
		return AlbumUpdateResponseDto.of(updatedAlbum);
	}

	// TODO: 수정 필요
	@Transactional
	public AlbumUpdateResponseDto createAlbum(AlbumCreateRequestDto albumCreateRequestDto) {
		// 앨범 객체 생성
		Album album = Album.builder()
				.albumName(albumCreateRequestDto.albumName())
				.albumDescription(albumCreateRequestDto.albumDescription())
				.albumCoverImage(albumCreateRequestDto.albumCoverImage())
				.build();

		// 앨범 저장
		Album savedAlbum = albumRepository.save(album);

		// 저장된 앨범을 DTO로 변환하여 반환
		return AlbumUpdateResponseDto.of(album);
	}

}