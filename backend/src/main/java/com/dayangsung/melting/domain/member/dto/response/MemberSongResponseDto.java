package com.dayangsung.melting.domain.member.dto.response;

import java.util.List;

import com.dayangsung.melting.domain.member.dto.SongListDto;

import lombok.Builder;

@Builder
public record MemberSongResponseDto(
	List<SongListDto> mySongList,
	boolean isPossibleAiCover
) {
	public static MemberSongResponseDto of(List<SongListDto> mySongList, boolean isPossibleAiCover) {
		return MemberSongResponseDto.builder()
			.mySongList(mySongList)
			.isPossibleAiCover(isPossibleAiCover)
			.build();
	}
}
