package com.dayangsung.melting.domain.elasticsearch.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dayangsung.melting.domain.elasticsearch.document.HashtagDocument;
import com.dayangsung.melting.domain.elasticsearch.repository.HashtagDocumentRepository;
import com.dayangsung.melting.domain.hashtag.dto.response.HashtagResponseDto;
import com.dayangsung.melting.domain.hashtag.entity.Hashtag;
import com.dayangsung.melting.domain.hashtag.repository.HashtagRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class HashtagSearchService {

	private final HashtagRepository hashtagRepository;
	private final HashtagDocumentRepository hashtagDocumentRepository;
	private final ElasticsearchOperations elasticsearchOperations;

	@Transactional
	public List<HashtagResponseDto> migrateDataToElasticsearch() {
		List<Hashtag> hashtags = hashtagRepository.findAll();
		List<HashtagDocument> documents = hashtags.stream()
			.map(HashtagDocument::createHashTagDocument)
			.toList();

		elasticsearchOperations.save(documents);

		return hashtags.stream().map(HashtagResponseDto::of).toList();
	}

	public List<HashtagResponseDto> searchHashtags(String query) {
		List<HashtagDocument> searchedHashtags = hashtagDocumentRepository.findByContentContaining(query);
		return searchedHashtags.stream().map(HashtagResponseDto::of).toList();
	}

}
