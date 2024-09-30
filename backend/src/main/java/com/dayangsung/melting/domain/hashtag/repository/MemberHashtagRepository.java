package com.dayangsung.melting.domain.hashtag.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dayangsung.melting.domain.hashtag.entity.Hashtag;
import com.dayangsung.melting.domain.hashtag.entity.MemberHashtag;
import com.dayangsung.melting.domain.member.entity.Member;

public interface MemberHashtagRepository extends JpaRepository<MemberHashtag, Long> {
	Optional<MemberHashtag> findByMemberAndHashtag(Member member, Hashtag hashtag);
}
