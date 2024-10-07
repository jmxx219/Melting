package com.dayangsung.melting.domain.hashtag.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dayangsung.melting.domain.album.entity.Album;
import com.dayangsung.melting.domain.hashtag.dto.response.HashtagPageResponseDto;
import com.dayangsung.melting.domain.hashtag.dto.response.HashtagResponseDto;
import com.dayangsung.melting.domain.hashtag.entity.AlbumHashtag;
import com.dayangsung.melting.domain.hashtag.entity.Hashtag;
import com.dayangsung.melting.domain.hashtag.entity.HashtagDocument;
import com.dayangsung.melting.domain.hashtag.entity.MemberHashtag;
import com.dayangsung.melting.domain.hashtag.repository.AlbumHashtagRepository;
import com.dayangsung.melting.domain.hashtag.repository.HashtagDocumentRepository;
import com.dayangsung.melting.domain.hashtag.repository.HashtagRepository;
import com.dayangsung.melting.domain.hashtag.repository.MemberHashtagRepository;
import com.dayangsung.melting.domain.member.entity.Member;
import com.dayangsung.melting.global.common.enums.ErrorMessage;
import com.dayangsung.melting.global.exception.BusinessException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class HashtagService {

	private final HashtagRepository hashtagRepository;
	private final MemberHashtagRepository memberHashtagRepository;
	private final AlbumHashtagRepository albumHashtagRepository;
	private final HashtagDocumentRepository hashtagDocumentRepository;
	// private final ElasticsearchOperations elasticsearchOperations;

	public Hashtag findHashtagByContent(String content) {
		return hashtagRepository.findByContent(content)
			.orElseThrow(() -> new BusinessException(ErrorMessage.HASHTAG_NOT_FOUND));
	}

	@Transactional
	public void addMemberHashtag(Member member, String content) {
		Hashtag hashtag = findHashtagByContent(content);
		MemberHashtag memberHashtag = MemberHashtag.builder()
			.member(member)
			.hashtag(hashtag)
			.build();
		member.addMemberHashtag(memberHashtag);
		try {
			memberHashtagRepository.save(memberHashtag);
			addHashtagDocument(hashtag);
		} catch (Exception e) {
			throw new BusinessException(ErrorMessage.MEMBER_HASHTAG_EXIST);
		}
	}

	@Transactional
	public void addAlbumHashtag(Album album, String content) {
		Hashtag hashtag = this.addHashtagIfNotExist(content);
		AlbumHashtag albumHashtag = AlbumHashtag.builder()
			.album(album)
			.hashtag(hashtag)
			.build();
		albumHashtag = albumHashtagRepository.save(albumHashtag);
		album.addHashtag(albumHashtag);
	}

	@Transactional
	public void deleteMemberHashtag(Member member, String content) {
		Hashtag hashtag = this.findHashtagByContent(content);
		MemberHashtag memberHashtag = memberHashtagRepository.findByMemberAndHashtag(member, hashtag)
			.orElseThrow(() -> new BusinessException(ErrorMessage.HASHTAG_NOT_FOUND));
		member.deleteMemberHashtag(memberHashtag);
		memberHashtagRepository.delete(memberHashtag);
	}

	public List<Hashtag> contentListToHashtagList(List<String> idList) {
		return idList.stream()
			.map(content -> Hashtag.builder().content(content).build())
			.toList();
	}

	@Transactional
	public Hashtag addHashtagIfNotExist(String content) {
		if (!hashtagRepository.existsByContent(content)) {
			return hashtagRepository.save(Hashtag.builder().content(content).build());
		} else {
			return hashtagRepository.findByContent(content)
				.orElseThrow(() -> new BusinessException(ErrorMessage.HASHTAG_NOT_FOUND));
		}
	}

	@Transactional
	public void addHashtagDocument(Hashtag hashtag) {
		HashtagDocument hashtagDocument = HashtagDocument.createHashTagDocument(hashtag);
		hashtagDocumentRepository.save(hashtagDocument);
	}

	public HashtagPageResponseDto searchHashtags(Pageable pageable, String keyword) {
		Page<HashtagDocument> hashtagDocumentPage = hashtagDocumentRepository.findByContentContaining(pageable, keyword);
		return HashtagPageResponseDto.from(hashtagDocumentPage);
	}

	@Transactional
	public List<HashtagResponseDto> migrateDataToElasticsearch() {
		List<Hashtag> hashtags = hashtagRepository.findAll();
		List<HashtagDocument> documents = hashtags.stream()
			.map(HashtagDocument::createHashTagDocument)
			.toList();

		hashtagDocumentRepository.saveAll(documents);
		return hashtags.stream().map(HashtagResponseDto::of).toList();
	}

}
