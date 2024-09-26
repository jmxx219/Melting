package com.dayangsung.melting.domain.album.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.dayangsung.melting.domain.album.entity.Album;
import com.dayangsung.melting.domain.hashtag.entity.AlbumGenre;
import com.dayangsung.melting.domain.hashtag.entity.AlbumHashtag;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AlbumExtractService {

	private List<String> extractHashtags(Album album) {
		List<AlbumHashtag> hashtags = album.getHashtags();
		List<String> toString = new ArrayList<>();
		for (AlbumHashtag albumHashtag : hashtags) {
			toString.add(albumHashtag.toString());
		}
		return toString.stream().limit(2).collect(Collectors.toList());
	}

	// 앨범에서 2개의 장르 추출
	private List<String> extractGenres(Album album) {
		List<AlbumGenre> genres = album.getGenres();
		List<String> toString = new ArrayList<>();
		for (AlbumGenre genre : genres) {
			toString.add(genre.toString());
		}
		return toString.stream().limit(2).collect(Collectors.toList());
	}

}
