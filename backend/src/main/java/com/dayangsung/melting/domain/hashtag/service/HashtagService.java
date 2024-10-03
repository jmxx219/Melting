package com.dayangsung.melting.domain.hashtag.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

	@Transactional
	public Hashtag addHashtagIfNotExist(String content) {
		if (!hashtagRepository.existsByContent(content)) {
			return hashtagRepository.save(Hashtag.builder().content(content).build());
		} else {
			return hashtagRepository.findByContent(content)
				.orElseThrow(() -> new BusinessException(ErrorMessage.HASHTAG_NOT_FOUND));
		}
	}

	public Hashtag findHashtagByContent(String content) {
		return hashtagRepository.findByContent(content)
			.orElseThrow(() -> new BusinessException(ErrorMessage.HASHTAG_NOT_FOUND));
	}

	@Transactional
	public void addMemberHashtag(Member member, String content) {
		Hashtag hashtag = this.addHashtagIfNotExist(content);
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
	public void deleteMemberHashtag(Member member, String content) {
		Hashtag hashtag = this.findHashtagByContent(content);
		MemberHashtag memberHashtag = memberHashtagRepository.findByMemberAndHashtag(member, hashtag)
			.orElseThrow(() -> new BusinessException(ErrorMessage.HASHTAG_NOT_FOUND));
		member.deleteMemberHashtag(memberHashtag);
		memberHashtagRepository.delete(memberHashtag);
	}

	@Transactional(readOnly = true)
	public List<Hashtag> idListToHashtagList(List<Long> idList) {
		return idList.stream().map(hashtagId -> hashtagRepository.findById(hashtagId)
			.orElseThrow(() -> new BusinessException(ErrorMessage.HASHTAG_NOT_FOUND))).toList();
	}
}
