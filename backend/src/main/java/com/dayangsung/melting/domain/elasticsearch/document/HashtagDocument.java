package com.dayangsung.melting.domain.elasticsearch.document;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import com.dayangsung.melting.domain.hashtag.entity.Hashtag;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@ToString
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Document(indexName = "hashtags")
public class HashtagDocument {
	@Id
	@Field(name = "id", type = FieldType.Keyword)
	private Long id;

	@Field(type = FieldType.Keyword)
	private String content;

	@Builder
	private HashtagDocument(Long id, String content) {
		this.id = id;
		this.content = content;
	}

	public static HashtagDocument createHashTagDocument(Hashtag hashtag) {
		return HashtagDocument.builder()
			.id(hashtag.getId())
			.content(hashtag.getContent())
			.build();
	}
}
