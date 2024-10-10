package com.dayangsung.melting.domain.hashtag.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import com.dayangsung.melting.domain.hashtag.entity.HashtagDocument;

public interface HashtagDocumentRepository extends ElasticsearchRepository<HashtagDocument, String> {
	Page<HashtagDocument> findByContentContaining(Pageable pageable, String keyword);
	Page<HashtagDocument> findByContentStartingWith(Pageable pageable, String keyword);
}
