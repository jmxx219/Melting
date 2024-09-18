package com.dayangsung.melting.domain.album.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dayangsung.melting.domain.album.entity.Album;
import com.dayangsung.melting.domain.album.service.AlbumService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/albums")
public class AlbumController {

	private final AlbumService albumService;

	// 공개 설정된 앨범 조회
	@GetMapping
	public ResponseEntity<List<Album>> getPublicAlbums() {
		List<Album> albums = albumService.getPublicAlbums();
		return new ResponseEntity<>(albums, HttpStatus.OK);
	}

	// 앨범 생성
	@PostMapping
	public ResponseEntity<Album> createAlbum(@RequestBody Album album) {
		Album createdAlbum = albumService.createAlbum(album);
		return new ResponseEntity<>(createdAlbum, HttpStatus.CREATED);
	}
	
}