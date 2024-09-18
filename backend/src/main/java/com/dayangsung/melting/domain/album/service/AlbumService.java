package com.dayangsung.melting.domain.album.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.dayangsung.melting.domain.album.entity.Album;
import com.dayangsung.melting.domain.album.repository.AlbumRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AlbumService {

	private final AlbumRepository albumRepository;

	public List<Album> getAllAlbums() {
		return albumRepository.findAll();
	}

	public List<Album> getPublicAlbums() {
		return albumRepository.findByIsPublicTrue();
	}

	public Album createAlbum(Album album) {
		return albumRepository.save(album);
	}
	
}