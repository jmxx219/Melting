package com.dayangsung.melting.domain.voice.entity;

import com.dayangsung.melting.domain.member.entity.Member;
import com.dayangsung.melting.domain.originalsong.entity.OriginalSong;
import com.dayangsung.melting.global.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "voice")
public class Voice extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "voice_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "original_song_id", nullable = false)
    private OriginalSong originalSong;

    private boolean isTrained;

    private String voiceUrl;

    @Builder
    public Voice(Member member, OriginalSong originalSong, boolean isTrained, String voiceUrl) {
        this.member = member;
        this.originalSong = originalSong;
        this.isTrained = isTrained;
        this.voiceUrl = voiceUrl;
    }

}
