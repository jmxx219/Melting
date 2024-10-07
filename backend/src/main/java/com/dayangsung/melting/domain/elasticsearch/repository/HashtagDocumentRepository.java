package com.dayangsung.melting.domain.elasticsearch.repository;

import java.util.List;

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import com.dayangsung.melting.domain.elasticsearch.document.HashtagDocument;

public interface HashtagDocumentRepository extends ElasticsearchRepository<HashtagDocument, String> {
	List<HashtagDocument> findByContentContaining(String content);
}
