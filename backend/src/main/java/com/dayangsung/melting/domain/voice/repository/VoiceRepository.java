package com.dayangsung.melting.domain.voice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dayangsung.melting.domain.member.entity.Member;
import com.dayangsung.melting.domain.originalsong.entity.OriginalSong;
import com.dayangsung.melting.domain.voice.entity.Voice;

@Repository
public interface VoiceRepository extends JpaRepository<Voice, Long> {
	boolean existsByMemberAndOriginalSong(Member member, OriginalSong originalSong);
}
