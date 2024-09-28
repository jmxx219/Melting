package com.dayangsung.melting.domain.album.dto.response;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import com.dayangsung.melting.domain.album.entity.Album;
import com.dayangsung.melting.domain.album.enums.AlbumCategory;
import com.dayangsung.melting.domain.comment.dto.response.CommentResponseDto;
import com.dayangsung.melting.domain.member.entity.Member;
import com.dayangsung.melting.domain.song.dto.response.SongDetailsResponseDto;

import lombok.Builder;

@Builder
public record AlbumDetailsResponseDto(
	Long albumId,
	String albumName,
	String albumCreatorNickname,
	String albumCreatorProfileImageUrl,
	String albumDescription,
	LocalDateTime createdAt,
	AlbumCategory category,
	List<SongDetailsResponseDto> songs,
	List<String> hashtags,
	List<String> genres,
	List<CommentResponseDto> comments,
	Long commentCount,
	Boolean isLiked,
	Integer likesCount
) {
	public static AlbumDetailsResponseDto of(Album album, Member member,
		Boolean isLiked, Integer albumLikesCount, List<SongDetailsResponseDto> songs, Long commentCount) {
		return AlbumDetailsResponseDto.builder()
			.albumId(album.getId())
			.albumName(album.getAlbumName())
			.albumCreatorNickname(member.getNickname())
			.albumCreatorProfileImageUrl(member.getProfileImageUrl())
			.albumDescription(album.getAlbumDescription())
			.category(album.getCategory())
			.createdAt(album.getCreatedAt())
			.songs(songs)
			.hashtags(album.getHashtags().stream()
				.map(albumHashtag -> albumHashtag.getHashtag().getContent())
				.collect(Collectors.toList()))
			.genres(album.getGenres().stream()
				.map(albumGenre -> albumGenre.getGenre().getContent())
				.collect(Collectors.toList()))
			.commentCount(commentCount)
			.isLiked(isLiked)
			.likesCount(albumLikesCount)
			.build();
	}
}
