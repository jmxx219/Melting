package com.dayangsung.melting.domain.member.dto.response;

import java.util.List;

import com.dayangsung.melting.domain.album.entity.Album;
import com.dayangsung.melting.domain.member.entity.Member;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

import lombok.Builder;

@Builder
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record MemberAlbumResponseDto(
	String nickname,
	List<Album> albums
) {
	public static MemberAlbumResponseDto of(Member member, List<Album> albums) {
		return MemberAlbumResponseDto.builder()
			.nickname(member.getNickname())
			.albums(albums)
			.build();
	}
}
