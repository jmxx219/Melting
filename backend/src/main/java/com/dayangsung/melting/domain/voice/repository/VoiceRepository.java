package com.dayangsung.melting.domain.voice.repository;

import com.dayangsung.melting.domain.voice.entity.Voice;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VoiceRepository extends JpaRepository<Voice, Long> {

    List<Voice> findByMemberId(Long memberId);

}
