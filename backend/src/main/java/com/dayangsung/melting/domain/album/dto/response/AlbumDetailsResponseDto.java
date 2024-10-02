package com.dayangsung.melting.domain.album.dto.response;

import java.time.LocalDateTime;
import java.util.List;

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
	Integer commentCount,
	Boolean isLiked,
	Integer likedCount
) {
	public static AlbumDetailsResponseDto of(Album album, Member member,
		Boolean isLiked, Integer albumLikesCount, List<SongDetailsResponseDto> songs, Integer commentCount) {
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
				.toList())
			.genres(album.getGenres().stream()
				.map(albumGenre -> albumGenre.getGenre().getContent())
				.toList())
			.comments(album.getComments().stream()
				.map(comment -> CommentResponseDto.of(comment, comment.getMember().getId().equals(member.getId())))
				.toList())
			.commentCount(commentCount)
			.isLiked(isLiked)
			.likedCount(albumLikesCount)
			.build();
	}
}
