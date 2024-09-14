package com.dayangsung.melting.domain.originalsong;

import com.dayangsung.melting.domain.originalsong.entity.OriginalSong;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OriginalSongRepository extends JpaRepository<OriginalSong, Long> {
}
