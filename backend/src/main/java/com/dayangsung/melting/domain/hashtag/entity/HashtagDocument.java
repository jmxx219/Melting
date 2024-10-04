package com.dayangsung.melting.domain.hashtag.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(indexName = "hashtag")
public class HashtagDocument {
	@Id
	@Field(name = "id", type = FieldType.Keyword)
	private String id;

	@Field(type = FieldType.Keyword)
	private String content;
}