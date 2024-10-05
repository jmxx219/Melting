package com.dayangsung.melting.domain.album.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.dayangsung.melting.domain.album.dto.request.AlbumCreateRequestDto;
import com.dayangsung.melting.domain.album.dto.response.AlbumDetailsResponseDto;
import com.dayangsung.melting.domain.album.dto.response.AlbumMyPageResponseDto;
import com.dayangsung.melting.domain.album.dto.response.AlbumMyResponseDto;
import com.dayangsung.melting.domain.album.dto.response.AlbumRankingPageResponseDto;
import com.dayangsung.melting.domain.album.dto.response.AlbumRankingResponseDto;
import com.dayangsung.melting.domain.album.dto.response.AlbumSearchPageResponseDto;
import com.dayangsung.melting.domain.album.dto.response.AlbumSearchResponseDto;
import com.dayangsung.melting.domain.album.dto.response.AlbumTrackInfoDto;
import com.dayangsung.melting.domain.album.entity.Album;
import com.dayangsung.melting.domain.album.enums.AlbumCategory;
import com.dayangsung.melting.domain.album.repository.AlbumRepository;
import com.dayangsung.melting.domain.genre.dto.response.GenreResponseDto;
import com.dayangsung.melting.domain.genre.service.GenreService;
import com.dayangsung.melting.domain.hashtag.service.HashtagService;
import com.dayangsung.melting.domain.likes.service.LikesService;
import com.dayangsung.melting.domain.member.entity.Member;
import com.dayangsung.melting.domain.member.repository.MemberRepository;
import com.dayangsung.melting.domain.song.dto.response.SongDetailsResponseDto;
import com.dayangsung.melting.domain.song.entity.Song;
import com.dayangsung.melting.domain.song.repository.SongRepository;
import com.dayangsung.melting.global.common.enums.ErrorMessage;
import com.dayangsung.melting.global.common.service.AwsS3Service;
import com.dayangsung.melting.global.exception.BusinessException;
import com.dayangsung.melting.global.util.RedisUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class AlbumService {

	private final MemberRepository memberRepository;
	private final AlbumRepository albumRepository;
	private final SongRepository songRepository;
	private final GenreService genreService;
	private final LikesService likesService;
	private final AwsS3Service awsS3Service;
	private final RedisUtil redisUtil;
	private final HashtagService hashtagService;

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
			if (song.getAlbum() != null) {
				throw new BusinessException(ErrorMessage.SONG_ALREADY_INCLUDED);
			}
			song.setAlbumInfo(album, trackNumber, Objects.equals(albumCreateRequestDto.titleSongId(), song.getId()));
			songRepository.save(song);
			album.addSong(song);
			songs.add(SongDetailsResponseDto.of(
				song, null,
				likesService.isLikedBySongAndMember(song.getId(), member.getId()),
				likesService.getSongLikesCount(songId)));
		}

		for (String genreContent : albumCreateRequestDto.genres()) {
			genreService.addAlbumGenre(album, genreContent);
		}

		for (String hashtagContent : albumCreateRequestDto.hashtags()) {
			hashtagService.addAlbumHashtag(album, hashtagContent);
		}

		album = albumRepository.save(album);
		String albumCoverImageUrl;
		if (!albumCoverImage.isEmpty()) {
			albumCoverImageUrl = awsS3Service.uploadAlbumCoverImage(albumCoverImage, album.getId());
		} else {
			albumCoverImageUrl = awsS3Service.getDefaultAlbumCoverImage(albumCreateRequestDto.defaultCoverNumber());
		}
		album.updateAlbumCoverImageUrl(albumCoverImageUrl);
		album = albumRepository.save(album);

		return AlbumDetailsResponseDto.of(album, member,
			likesService.isLikedByAlbumAndMember(album.getId(), member.getId()),
			likesService.getAlbumLikesCount(album.getId()), songs, 0);
	}

	public AlbumDetailsResponseDto getAlbumDetails(Long albumId) {
		Album album = albumRepository.findById(albumId)
			.orElseThrow(() -> new BusinessException(ErrorMessage.ALBUM_NOT_FOUND));
		List<SongDetailsResponseDto> songDetails = getSongDetails(album);

		return AlbumDetailsResponseDto.of(album, album.getMember(),
			likesService.isLikedByAlbumAndMember(album.getId(), album.getMember().getId()),
			likesService.getAlbumLikesCount(album.getId()), songDetails, album.getComments().size());
	}

	public AlbumDetailsResponseDto updateAlbumDescription(Long albumId, String description) {
		Album album = albumRepository.findById(albumId)
			.orElseThrow(() -> new BusinessException(ErrorMessage.ALBUM_NOT_FOUND));
		album.updateAlbumDescription(description);
		albumRepository.save(album);
		List<SongDetailsResponseDto> songDetails = getSongDetails(album);

		return AlbumDetailsResponseDto.of(album, album.getMember(),
			likesService.isLikedByAlbumAndMember(album.getId(), album.getMember().getId()),
			likesService.getAlbumLikesCount(album.getId()), songDetails, album.getComments().size());
	}

	public AlbumSearchPageResponseDto getAlbums(int sort, int page, int size) {
		Pageable pageable = PageRequest.of(page, size);
		Page<Album> albumPage;
		if (sort == 1) {
			albumPage = albumRepository.findAllByOrderByLikesCountDesc(pageable);
		} else {
			albumPage = albumRepository.findAllByOrderByCreatedAtDesc(pageable);
		}
		Page<AlbumSearchResponseDto> albumSearchPage = albumPage.map(AlbumSearchResponseDto::of);
		return AlbumSearchPageResponseDto.of(albumSearchPage);
	}

	public AlbumSearchPageResponseDto searchAlbum(int page, int size, String keyword, List<String> options) {
		Set<Album> searchResultSet = new HashSet<>();
		if (keyword == null || keyword.isEmpty()) {
			return this.getAlbums(0, page, size);
		}
		if (options.size() == 1 && options.getFirst().equals("all")) {
			options = Arrays.asList("albumName", "songTitle", "hashtag", "genre");
		}
		log.debug("options: {}", options);
		for (String option : options) {
			switch (option) {
				case "albumName":
					searchResultSet.addAll(
						albumRepository.findByAlbumNameContaining(keyword, Pageable.unpaged()).getContent());
					break;
				case "songTitle":
					searchResultSet.addAll(
						albumRepository.findBySongTitleContaining(keyword, Pageable.unpaged()).getContent());
					break;
				case "hashtag":
					searchResultSet.addAll(
						albumRepository.findByHashtagContentContaining(keyword, Pageable.unpaged()).getContent());
					break;
				case "genre":
					searchResultSet.addAll(
						albumRepository.findByGenreNameContaining(keyword, Pageable.unpaged()).getContent());
					break;
			}
		}

		List<Album> searchResultList = new ArrayList<>(searchResultSet);
		int start = Math.min(page * size, searchResultList.size());
		int end = Math.min((page + 1) * size, searchResultList.size());
		List<Album> paginatedList = searchResultList.subList(start, end);

		List<AlbumSearchResponseDto> albumSearchList = paginatedList.stream()
			.map(AlbumSearchResponseDto::of)
			.toList();
		Page<AlbumSearchResponseDto> albumSearchPage = new PageImpl<>(albumSearchList, PageRequest.of(page, size),
			searchResultList.size());
		return AlbumSearchPageResponseDto.of(albumSearchPage);
	}

	private List<SongDetailsResponseDto> getSongDetails(Album album) {
		return album.getSongs().stream()
			.map(song -> SongDetailsResponseDto.of(song, album.getAlbumCoverImageUrl(),
				likesService.isLikedBySongAndMember(album.getMember().getId(), song.getId()),
				likesService.getSongLikesCount(song.getId())))
			.toList();
	}

	public void deleteAlbum(Long albumId) {
		Album album = albumRepository.findById(albumId)
			.orElseThrow(() -> new BusinessException(ErrorMessage.ALBUM_NOT_FOUND));
		for (Song song : album.getSongs()) {
			song.removeFromAlbum();
		}
		likesService.deleteAlbumLikesOnRedis(albumId);
		album.deleteAlbum();
		albumRepository.save(album);
	}

	public Boolean toggleIsPublic(Long albumId) {
		Album album = albumRepository.findById(albumId)
			.orElseThrow(() -> new BusinessException(ErrorMessage.ALBUM_NOT_FOUND));
		Boolean toggledIsPublic = album.toggleIsPublic();
		albumRepository.save(album);
		return toggledIsPublic;
	}

	public AlbumMyPageResponseDto getMemberAlbums(Long memberId, int sort, int page, int size) {
		Pageable pageable = PageRequest.of(page, size);
		Page<Album> albumPage;
		if (sort == 1) {
			albumPage = albumRepository.findByMemberIdAndOrderByLikesCountDesc(memberId, pageable);
		} else {
			albumPage = albumRepository.findByMemberIdAndOrderByCreatedAtDesc(memberId, pageable);
		}
		Page<AlbumMyResponseDto> albumMyResponseDtoPage = albumPage.map(album -> AlbumMyResponseDto.of(album,
			likesService.isLikedByAlbumAndMember(album.getId(), memberId),
			likesService.getAlbumLikesCount(album.getId())));
		return AlbumMyPageResponseDto.of(albumMyResponseDtoPage);
	}

	public AlbumMyPageResponseDto getMemberLikesAlbums(Long memberId, int sort, int page, int size) {
		Pageable pageable = PageRequest.of(page, size);
		Page<Album> albumPage;
		if (sort == 1) {
			albumPage = albumRepository.findLikedAlbumsByMemberIdOrderByLikesCountDesc(memberId, pageable);
		} else {
			albumPage = albumRepository.findLikedAlbumsByMemberIdOrderByCreatedAtDesc(memberId, pageable);
		}
		Page<AlbumMyResponseDto> albumMyResponseDtoPage = albumPage.map(album -> AlbumMyResponseDto.of(album,
			likesService.isLikedByAlbumAndMember(album.getId(), memberId),
			likesService.getAlbumLikesCount(album.getId())));
		return AlbumMyPageResponseDto.of(albumMyResponseDtoPage);
	}

	public List<AlbumRankingResponseDto> getSteadyAlbums() {
		List<Album> top5AlbumLikes = redisUtil.getTop5AlbumLikes();
		return top5AlbumLikes.stream().map(AlbumRankingResponseDto::of).toList();
	}

	public List<AlbumRankingResponseDto> getHot5Albums() {
		List<Album> hot5Albums = redisUtil.getTop5AlbumsStreaming(true);
		return hot5Albums.stream().map(AlbumRankingResponseDto::of).toList();
	}

	public List<AlbumRankingResponseDto> getMonthlyTop5Albums() {
		List<Album> monthlyTop5Albums = redisUtil.getTop5AlbumsStreaming(false);
		return monthlyTop5Albums.stream().map(AlbumRankingResponseDto::of).toList();
	}

	public AlbumRankingPageResponseDto findByHashtag(String content, int page, int size) {
		Pageable pageable = PageRequest.of(page, size);
		Page<AlbumRankingResponseDto> albumPage =
			albumRepository.findByHashtag(content, pageable).map(AlbumRankingResponseDto::of);
		return AlbumRankingPageResponseDto.of(albumPage);
	}

	public List<GenreResponseDto> getAllGenres() {
		return genreService.findAll();
	}

	public Integer getAlbumLikesCount(Long albumId) {
		return likesService.getAlbumLikesCount(albumId);
	}

	public Integer increaseAlbumLikes(Long albumId, String email) {
		Member member = memberRepository.findByEmail(email)
			.orElseThrow(() -> new BusinessException(ErrorMessage.MEMBER_NOT_FOUND));
		return likesService.increaseAlbumLikes(albumId, member.getId());
	}

	public Integer decreaseAlbumLikes(Long albumId, String email) {
		Member member = memberRepository.findByEmail(email)
			.orElseThrow(() -> new BusinessException(ErrorMessage.MEMBER_NOT_FOUND));
		return likesService.decreaseAlbumLikes(albumId, member.getId());
	}

	public List<AlbumTrackInfoDto> getTrackListInfo(Long albumId) {
		Album album = albumRepository.findById(albumId)
			.orElseThrow(() -> new BusinessException(ErrorMessage.ALBUM_NOT_FOUND));
		List<AlbumTrackInfoDto> trackInfo = new ArrayList<>();
		List<Song> songs = album.getSongs();
		for (int i = 0; i < album.getSongs().size(); i++) {
			Long currentSongId = songs.get(i).getId();
			Long previousSongId = i > 0 ? songs.get(i - 1).getId() : null;
			Long nextSongId = i < songs.size() - 1 ? songs.get(i + 1).getId() : null;
			AlbumTrackInfoDto trackInfoDto = AlbumTrackInfoDto.of(
				albumId, currentSongId, previousSongId, nextSongId);
			trackInfo.add(trackInfoDto);
		}
		return trackInfo;
	}
}
