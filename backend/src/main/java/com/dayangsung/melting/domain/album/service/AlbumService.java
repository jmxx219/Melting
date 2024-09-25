package com.dayangsung.melting.domain.album.service;

import static com.dayangsung.melting.global.common.response.enums.ErrorMessage.*;

import java.util.List;
import java.util.function.Supplier;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.webjars.NotFoundException;

import com.dayangsung.melting.domain.album.dto.request.AlbumCreateRequestDto;
import com.dayangsung.melting.domain.album.dto.request.AlbumUpdateRequestDto;
import com.dayangsung.melting.domain.album.dto.response.AlbumDetailsResponseDto;
import com.dayangsung.melting.domain.album.dto.response.AlbumMainResponseDto;
import com.dayangsung.melting.domain.album.dto.response.AlbumSearchResponseDto;
import com.dayangsung.melting.domain.album.dto.response.AlbumUpdateResponseDto;
import com.dayangsung.melting.domain.album.entity.Album;
import com.dayangsung.melting.domain.album.enums.AlbumSortType;
import com.dayangsung.melting.domain.album.repository.AlbumRepository;
import com.dayangsung.melting.domain.song.entity.Song;

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
	public List<AlbumMainResponseDto> getAlbumsSorted(AlbumSortType sort) {
		List<Album> albums = switch (sort) {
			// TODO: 좋아요 순 정렬 추가
			case POPULAR -> albumRepository.findByIsPublicTrueAndIsDeletedFalse();
			case LATEST -> albumRepository.findByIsPublicTrueAndIsDeletedFalseOrderByCreatedAtDesc();
			default -> throw new IllegalArgumentException(INVALID_SORT_CRITERIA.getErrorMessage());
		};

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
			throw new IllegalArgumentException(SEARCH_QUERY_TOO_SHORT.getErrorMessage());
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
		Album album = albumRepository.findByIdAndIsDeletedFalse(albumId);

		// 앨범 데이터를 DTO로 변환
		return AlbumDetailsResponseDto.of(album);
	}

	@Transactional
	public AlbumUpdateResponseDto updateAlbum(Long albumId, AlbumUpdateRequestDto albumUpdateRequestDto) {
		// 앨범 조회
		Album album = albumRepository.findById(albumId)
			.orElseThrow(() -> new NotFoundException(ALBUM_NOT_FOUND.getErrorMessage()));

		// DTO에서 받은 정보로 앨범 업데이트
		String newAlbumName = albumUpdateRequestDto.albumName();
		if (newAlbumName != null) {
			album.updateAlbumName(newAlbumName);
		} else {
			throw new IllegalArgumentException(ALBUM_NAME_BLANK_ERROR.getErrorMessage());
		}
		String newAlbumDescription = albumUpdateRequestDto.albumDescription();
		if (newAlbumDescription != null) {
			album.updateAlbumDescription(newAlbumDescription);
		} else {
			// TODO: AI 소개 생성
		}

		// 앨범 저장
		Album updatedAlbum = albumRepository.save(album);

		// 업데이트된 앨범을 DTO로 변환하여 반환
		return AlbumUpdateResponseDto.of(updatedAlbum);
	}

	// TODO: 수정 및 확인 필요
	@Transactional
	public AlbumUpdateResponseDto createAlbum(AlbumCreateRequestDto albumCreateRequestDto) {
		// 앨범 이름 유효성 검사
		if (albumCreateRequestDto.albumName() == null || albumCreateRequestDto.albumName().trim().isEmpty()) {
			throw new IllegalArgumentException(ALBUM_NAME_BLANK_ERROR.getErrorMessage());
		}

		// 앨범 설명 유효성 검사
		if (albumCreateRequestDto.albumDescription() == null || albumCreateRequestDto.albumDescription()
			.trim()
			.isEmpty()) {
			// TODO: AI 소개 생성
		}

		// 앨범 커버 이미지 유효성 검사
		if (albumCreateRequestDto.albumCoverImage() == null || albumCreateRequestDto.albumCoverImage()
			.trim()
			.isEmpty()) {
			throw new IllegalArgumentException(ALBUM_COVER_IMAGE_BLANK_ERROR.getErrorMessage());
		}

		// 곡 목록 유효성 검사
		List<Song> songs = albumCreateRequestDto.songs();
		if (songs == null || songs.isEmpty()) {
			throw new IllegalArgumentException(ALBUM_SONGS_EMPTY_ERROR.getErrorMessage());
		} else if (10 <= songs.size()) {
			throw new IllegalArgumentException(INVALID_SONG_COUNT.getErrorMessage());
		}

		// 앨범 객체 생성
		Album album = Album.builder()
			.albumName(albumCreateRequestDto.albumName())
			.albumDescription(albumCreateRequestDto.albumDescription())
			.albumCoverImage(albumCreateRequestDto.albumCoverImage())
			.build();

		// 곡 추가
		for (int i = 0; i < songs.size(); i++) {
			// 앨범에 곡 추가
			// TODO: isTitle 고려
			album.addSong(songs.get(i), i + 1, i == 0); // 첫 번째 곡을 타이틀 곡으로 설정
		}

		// 앨범 저장
		Album savedAlbum = albumRepository.save(album);

		// 저장된 앨범을 DTO로 변환하여 반환
		return AlbumUpdateResponseDto.of(savedAlbum);
	}

}