package com.dayangsung.melting.domain.hashtag.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dayangsung.melting.domain.album.entity.Album;
import com.dayangsung.melting.domain.hashtag.dto.response.HashtagResponseDto;
import com.dayangsung.melting.domain.hashtag.entity.AlbumHashtag;
import com.dayangsung.melting.domain.hashtag.entity.Hashtag;
import com.dayangsung.melting.domain.hashtag.entity.MemberHashtag;
import com.dayangsung.melting.domain.hashtag.repository.AlbumHashtagRepository;
import com.dayangsung.melting.domain.hashtag.repository.HashtagRepository;
import com.dayangsung.melting.domain.hashtag.repository.MemberHashtagRepository;
import com.dayangsung.melting.domain.member.entity.Member;
import com.dayangsung.melting.global.common.enums.ErrorMessage;
import com.dayangsung.melting.global.exception.BusinessException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class HashtagService {

	private final HashtagRepository hashtagRepository;
	private final MemberHashtagRepository memberHashtagRepository;
	private final AlbumHashtagRepository albumHashtagRepository;

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

	@Transactional(readOnly = true)
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

	public Page<HashtagResponseDto> searchHashtags(String keyword, int page, int size) {
		Pageable pageable = PageRequest.of(page, size);
		Page<Hashtag> hashtags;
		if (keyword == null || keyword.trim().isEmpty()) {
			hashtags = hashtagRepository.findAll(pageable);
		} else {
			hashtags = hashtagRepository.findByContentContaining(keyword, pageable);
		}
		return hashtags.map(HashtagResponseDto::of);
	}
}
