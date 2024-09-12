package com.dayangsung.melting.domain.generatedalbum.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dayangsung.melting.domain.generatedalbum.entity.GeneratedAlbum;
import com.dayangsung.melting.domain.generatedalbum.service.GeneratedAlbumService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/albums")
public class GeneratedAlbumController {

	private final GeneratedAlbumService generatedAlbumService;

	// 공개 설정된 앨범 조회
	@GetMapping
	public ResponseEntity<List<GeneratedAlbum>> getPublicAlbums() {
		List<GeneratedAlbum> albums = generatedAlbumService.getPublicAlbums();
		return new ResponseEntity<>(albums, HttpStatus.OK);
	}

}