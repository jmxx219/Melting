package com.dayangsung.melting.domain.album.dto.response;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.dayangsung.melting.domain.album.entity.Album;
import com.dayangsung.melting.domain.album.enums.AlbumCategory;
import com.dayangsung.melting.domain.comment.dto.response.CommentResponseDto;
import com.dayangsung.melting.domain.member.entity.Member;
import com.dayangsung.melting.domain.song.dto.response.SongDetailsResponseDto;
import com.dayangsung.melting.domain.song.entity.Song;

import lombok.Builder;

@Builder
public record AlbumDetailsResponseDto(
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
		Boolean isLiked, Integer albumLikesCount, Map<Long, Integer> songLikesCounts, List<Song> songs,
		Long commentCount, String defaultAlbumCoverImageUrl) {
		return AlbumDetailsResponseDto.builder()
			.albumName(album.getAlbumName())
			.albumCreatorNickname(member.getNickname())
			.albumCreatorProfileImageUrl(member.getProfileImageUrl())
			.albumDescription(album.getAlbumDescription())
			.createdAt(album.getCreatedAt())
			.songs(songs.stream()
				.map(song -> SongDetailsResponseDto.of(song, defaultAlbumCoverImageUrl, songLikesCounts.get(song.getId())))
				.collect(Collectors.toList()))
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
