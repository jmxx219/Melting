package com.dayangsung.melting.domain.hashtag.repository;

import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.data.elasticsearch.core.query.Criteria;
import org.springframework.data.elasticsearch.core.query.CriteriaQuery;
import org.springframework.data.elasticsearch.core.query.Query;

import com.dayangsung.melting.domain.hashtag.entity.HashtagDocument;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class CustomHashtagSearchRepository {

	private final ElasticsearchOperations elasticsearchOperations;

	public SearchHits<HashtagDocument> searchByContent(String keyword, int size, List<Object> searchAfter) {
		Criteria criteria = new Criteria("content").contains(keyword);
		Query query = new CriteriaQuery(criteria);
		query.setPageable(PageRequest.of(0, size));
		query.addSort(Sort.by(Sort.Direction.ASC, "content"));
		if (searchAfter != null && !searchAfter.isEmpty()) {
			query.setSearchAfter(searchAfter);
		}
		return elasticsearchOperations.search(query, HashtagDocument.class);
	}
}