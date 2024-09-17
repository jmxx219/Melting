package com.dayangsung.melting.global.entity;

import java.io.File;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AudioFile extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "file_id")
	private Long id;

	@Column(nullable = false)
	private String fileName;

	@Column(nullable = false)
	private String filePath;

	@Column(nullable = false)
	private String fileExtension;

	@Builder
	public AudioFile(String fileName, String filePath, String fileExtension) {
		this.fileName = fileName;
		this.filePath = filePath;
		this.fileExtension = fileExtension;
	}

	public String getAudioFileFullPath() {
		return filePath + File.separator + id + File.separator + fileName + fileExtension;
	}
}
