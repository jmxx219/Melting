package com.dayangsung.melting.domain.hashtag.service;

import java.util.List;
import java.util.Map;
import java.util.Objects;

import org.springframework.data.elasticsearch.core.SearchHit;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dayangsung.melting.domain.album.entity.Album;
import com.dayangsung.melting.domain.album.repository.AlbumRepository;
import com.dayangsung.melting.domain.hashtag.entity.AlbumHashtag;
import com.dayangsung.melting.domain.hashtag.entity.Hashtag;
import com.dayangsung.melting.domain.hashtag.entity.HashtagDocument;
import com.dayangsung.melting.domain.hashtag.repository.HashtagElasticsearchRepository;
import com.dayangsung.melting.domain.hashtag.repository.HashtagRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class HashtagService {

	private final AlbumRepository albumRepository;
	private final HashtagRepository hashtagRepository;
	private final HashtagElasticsearchRepository hashtagElasticsearchRepository;

	@Transactional
	public void addHashtagsToAlbum(Long albumId, List<String> hashtagContents) {
		Album album = albumRepository.findById(albumId)
				.orElseThrow(() -> new RuntimeException("해당 앨범을 찾을 수 없습니다."));

		List<Hashtag> hashtags = hashtagContents.stream()
				.map(this::getOrCreateHashtag)
				.toList();

		hashtags.forEach(hashtag -> {
			AlbumHashtag albumHashtag = AlbumHashtag.builder()
					.album(album)
					.hashtag(hashtag)
					.build();

			album.getHashtags().add(albumHashtag);
			updateElasticsearchIndex(albumHashtag);
		});

		albumRepository.save(album);
	}

	private Hashtag getOrCreateHashtag(String content) {
		return hashtagRepository.findByContent(content)
				.orElseGet(() -> {
					Hashtag newHashtag = new Hashtag(null, content);
					hashtagRepository.save(newHashtag);

					HashtagDocument hashtagDocument = HashtagDocument.builder()
							.id(newHashtag.getId().toString()) // Hashtag ID 사용
							.content(content)
							.build();
					hashtagElasticsearchRepository.save(hashtagDocument);
					return newHashtag;
				});
	}

	public void saveHashtag(String content) {
		HashtagDocument hashtagDocument = HashtagDocument.builder()
				.content(content)
				.build();
		hashtagElasticsearchRepository.save(hashtagDocument);
	}

	public void saveHashtag(HashtagDocument hashtagDocument) {
		hashtagElasticsearchRepository.save(hashtagDocument);
	}

	private void updateElasticsearchIndex(AlbumHashtag albumHashtag) {
		HashtagDocument hashtagDocument = HashtagDocument.builder()
				.id(albumHashtag.getHashtag().getId().toString()) // Use Hashtag ID as document ID
				.content(albumHashtag.getHashtag().getContent())
				.build();

		hashtagElasticsearchRepository.save(hashtagDocument);
	}

	public Map<String, Object> searchHashtags(String keyword, int size, Object[] searchAfter) {
		SearchHits<HashtagDocument> searchHits = hashtagElasticsearchRepository.searchByContent(keyword, size,
				searchAfter);
		List<HashtagDocument> results = searchHits.getSearchHits().stream()
				.map(SearchHit::getContent)
				.toList();

		List<Object> nextSearchAfter = searchHits.getSearchHits().isEmpty() ? null
				: searchHits.getSearchHits().getLast().getSortValues();

		return Map.of(
				"hashtags", results,
				"nextSearchAfter", Objects.requireNonNull(nextSearchAfter)
		);
	}
}