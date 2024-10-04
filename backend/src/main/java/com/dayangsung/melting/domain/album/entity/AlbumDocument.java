package com.dayangsung.melting.domain.album.entity;

import java.util.List;

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
@Document(indexName = "albums")
public class AlbumDocument {

	@Id
	private Long id;

	@Field(type = FieldType.Text, analyzer = "standard")
	private String albumName;

	@Field(type = FieldType.Text, analyzer = "standard")
	private String albumDescription;

	@Field(type = FieldType.Keyword)
	private List<String> hashtags;

	@Field(type = FieldType.Keyword)
	private List<String> genres;

	@Field(type = FieldType.Boolean)
	private Boolean isPublic;

	@Field(type = FieldType.Boolean)
	private Boolean isDeleted;
}