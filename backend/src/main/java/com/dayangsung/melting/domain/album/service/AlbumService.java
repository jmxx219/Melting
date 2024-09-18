package com.dayangsung.melting.domain.album.service;

import java.util.List;
import java.util.function.Supplier;

import org.springframework.stereotype.Service;

import com.dayangsung.melting.domain.album.dto.response.AlbumResponseDto;
import com.dayangsung.melting.domain.album.entity.Album;
import com.dayangsung.melting.domain.album.repository.AlbumRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AlbumService {

	private final AlbumRepository albumRepository;

	public List<Album> getAllAlbums() {
		return albumRepository.findAll();
	public List<AlbumResponseDto> getAllAlbums() {
		return getAlbumsBy(albumRepository::findAll);
	}

	public List<Album> getPublicAlbums() {
		return albumRepository.findByIsPublicTrue();
	public List<AlbumResponseDto> getPublicAndNotDeletedAlbums() {
		return getAlbumsBy(albumRepository::findByIsPublicTrueAndIsDeletedFalse);
	}
	public List<AlbumResponseDto> searchAlbumsByKeyword(String keyword) {
		if (keyword == null || keyword.trim().isEmpty()) {
			return getPublicAndNotDeletedAlbums();
		}
		return getAlbumsBy(() -> albumRepository.findByKeywordAndIsPublicTrueAndIsDeletedFalse(keyword));
	}

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