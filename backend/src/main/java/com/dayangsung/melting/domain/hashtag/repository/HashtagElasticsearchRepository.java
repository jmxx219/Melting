package com.dayangsung.melting.domain.hashtag.repository;

import java.util.Optional;

import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import com.dayangsung.melting.domain.hashtag.entity.HashtagDocument;

public interface HashtagElasticsearchRepository extends ElasticsearchRepository<HashtagDocument, Long> {

	SearchHits<HashtagDocument> searchByContent(String keyword, int size, Object[] searchAfter);

	<T> Optional<T> findByContent(String content);

}