package com.dayangsung.melting.domain.album.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.dayangsung.melting.domain.album.dto.request.AlbumCreateRequestDto;
import com.dayangsung.melting.domain.album.dto.response.AlbumDetailsResponseDto;
import com.dayangsung.melting.domain.album.entity.Album;
import com.dayangsung.melting.domain.album.enums.AlbumCategory;
import com.dayangsung.melting.domain.album.repository.AlbumRepository;
import com.dayangsung.melting.domain.genre.entity.AlbumGenre;
import com.dayangsung.melting.domain.genre.entity.Genre;
import com.dayangsung.melting.domain.genre.repository.AlbumGenreRepository;
import com.dayangsung.melting.domain.genre.repository.GenreRepository;
import com.dayangsung.melting.domain.hashtag.entity.AlbumHashtag;
import com.dayangsung.melting.domain.hashtag.entity.Hashtag;
import com.dayangsung.melting.domain.hashtag.repository.AlbumHashtagRepository;
import com.dayangsung.melting.domain.hashtag.repository.HashtagRepository;
import com.dayangsung.melting.domain.likes.repository.LikesAlbumRepository;
import com.dayangsung.melting.domain.likes.service.LikesService;
import com.dayangsung.melting.domain.member.entity.Member;
import com.dayangsung.melting.domain.member.repository.MemberRepository;
import com.dayangsung.melting.domain.song.dto.response.SongDetailsResponseDto;
import com.dayangsung.melting.domain.song.entity.Song;
import com.dayangsung.melting.domain.song.repository.SongRepository;
import com.dayangsung.melting.global.common.enums.ErrorMessage;
import com.dayangsung.melting.global.common.service.AwsS3Service;
import com.dayangsung.melting.global.exception.BusinessException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AlbumService {

	private final MemberRepository memberRepository;
	private final AlbumRepository albumRepository;
	private final SongRepository songRepository;
	private final GenreRepository genreRepository;
	private final AlbumGenreRepository albumGenreRepository;
	private final HashtagRepository hashtagRepository;
	private final AlbumHashtagRepository albumHashtagRepository;
	private final LikesAlbumRepository likesAlbumRepository;
	private final LikesService likesService;
	private final AwsS3Service awsS3Service;

	@Transactional
	public AlbumDetailsResponseDto createAlbum(AlbumCreateRequestDto albumCreateRequestDto,
		MultipartFile albumCoverImage, String email) {
		Member member = memberRepository.findByEmail(email)
			.orElseThrow(() -> new BusinessException(ErrorMessage.MEMBER_NOT_FOUND));

		int songCount = albumCreateRequestDto.songs().size();
		Album album = albumRepository.save(Album.builder()
			.member(member)
			.albumName(albumCreateRequestDto.albumName())
			.albumDescription(albumCreateRequestDto.albumDescription())
			.category(AlbumCategory.findCategoryBySongCount(songCount))
			.build());

		List<SongDetailsResponseDto> songs = new ArrayList<>();
		for (int trackNumber = 1; trackNumber <= songCount; trackNumber++) {
			Long songId = albumCreateRequestDto.songs().get(trackNumber - 1);
			Song song = songRepository.findById(songId)
				.orElseThrow(() -> new BusinessException(ErrorMessage.SONG_NOT_FOUND));
			song.setTrackNumber(trackNumber);
			song.setIsTitle(Objects.equals(albumCreateRequestDto.titleSongId(), song.getId()));
			songRepository.save(song);
			album.addSong(song);
			songs.add(SongDetailsResponseDto.of(song, null, likesService.getSongLikesCount(songId)));
		}

		for (Long genreId : albumCreateRequestDto.genres()) {
			Genre genre = genreRepository.findById(genreId)
				.orElseThrow(() -> new BusinessException(ErrorMessage.GENRE_NOT_FOUND));
			AlbumGenre albumGenre = AlbumGenre.builder().album(album).genre(genre).build();
			albumGenreRepository.save(albumGenre);
			album.addGenre(albumGenre);
		}

		for (String content : albumCreateRequestDto.hashtags()) {
			Hashtag hashtag = hashtagRepository.findByContent(content)
				.orElseGet(() -> hashtagRepository.save(new Hashtag(content)));
			AlbumHashtag albumHashtag = AlbumHashtag.builder().album(album).hashtag(hashtag).build();
			albumHashtagRepository.save(albumHashtag);
			album.addHashtag(albumHashtag);
		}

		album = albumRepository.save(album);
		String albumCoverImageUrl = awsS3Service.uploadAlbumCoverImage(albumCoverImage, album.getId());
		album.updateAlbumCoverImageUrl(albumCoverImageUrl);
		album = albumRepository.save(album);

		return AlbumDetailsResponseDto.of(album, member,
			likesAlbumRepository.existsLikesAlbumByAlbumIdAndMemberId(album.getId(), member.getId()),
			likesService.getAlbumLikesCount(album.getId()), songs, 0L);
	}

}
