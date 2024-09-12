package com.dayangsung.melting.domain.generatedalbum.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.dayangsung.melting.domain.generatedalbum.entity.GeneratedAlbum;
import com.dayangsung.melting.domain.generatedalbum.repository.GeneratedAlbumRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class GeneratedAlbumService {

	private final GeneratedAlbumRepository generatedAlbumRepository;

	public List<GeneratedAlbum> getAllAlbums() {
		return generatedAlbumRepository.findAll();
	}

	public List<GeneratedAlbum> getPublicAlbums() {
		return generatedAlbumRepository.findByIsPublicTrue();
	}

	public GeneratedAlbum createAlbum(GeneratedAlbum album) {
		return generatedAlbumRepository.save(album);
	}
	
}