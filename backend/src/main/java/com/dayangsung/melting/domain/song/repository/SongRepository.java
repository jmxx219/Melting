package com.dayangsung.melting.domain.song.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dayangsung.melting.domain.member.entity.Member;
import com.dayangsung.melting.domain.originalsong.entity.OriginalSong;
import com.dayangsung.melting.domain.song.entity.Song;
import com.dayangsung.melting.domain.song.enums.SongType;

public interface SongRepository extends JpaRepository<Song, Long> {
	List<Song> findByMemberIdAndIsDeletedFalse(Long memberId);

	Optional<Song> findByMemberAndOriginalSongAndSongType(Member member, OriginalSong originalSong, SongType songType);
}
