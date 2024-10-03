package com.dayangsung.melting.domain.song.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.MediaType;
import org.springframework.http.client.MultipartBodyBuilder;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import com.dayangsung.melting.domain.likes.service.LikesService;
import com.dayangsung.melting.domain.member.entity.Member;
import com.dayangsung.melting.domain.member.enums.Gender;
import com.dayangsung.melting.domain.member.repository.MemberRepository;
import com.dayangsung.melting.domain.originalsong.entity.OriginalSong;
import com.dayangsung.melting.domain.originalsong.repository.OriginalSongRepository;
import com.dayangsung.melting.domain.song.dto.response.SongDetailsResponseDto;
import com.dayangsung.melting.domain.song.dto.response.SongLikesPageResponseDto;
import com.dayangsung.melting.domain.song.dto.response.SongLikesResponseDto;
import com.dayangsung.melting.domain.song.dto.response.SongSearchPageResponseDto;
import com.dayangsung.melting.domain.song.dto.response.SongSearchResponseDto;
import com.dayangsung.melting.domain.song.entity.Song;
import com.dayangsung.melting.domain.song.enums.SongType;
import com.dayangsung.melting.domain.song.repository.SongRepository;
import com.dayangsung.melting.global.common.enums.ErrorMessage;
import com.dayangsung.melting.global.common.service.AwsS3Service;
import com.dayangsung.melting.global.exception.BusinessException;
import com.dayangsung.melting.global.redisson.DistributedLock;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class SongService {

	private final SongRepository songRepository;
	private final AwsS3Service awsS3Service;
	private final LikesService likesService;
	private final RedisTemplate<String, Object> redisTemplate;

	private static final String STREAMING_COUNT_KEY = "song:streaming:counts";
	private final OriginalSongRepository originalSongRepository;
	private final MemberRepository memberRepository;
	private final WebClient webClient;

	public SongDetailsResponseDto getSongDetails(Long songId, String email) {
		Song song = songRepository.findById(songId)
			.orElseThrow(() -> new BusinessException(ErrorMessage.SONG_NOT_FOUND));
		Member member = memberRepository.findByEmail(email)
			.orElseThrow(() -> new BusinessException(ErrorMessage.MEMBER_NOT_FOUND));

		String albumCoverImageUrl = awsS3Service.getDefaultCoverImageUrl();
		if (song.getAlbum() != null) {
			albumCoverImageUrl = song.getAlbum().getAlbumCoverImageUrl();
		}
		incrementStreamingCount(song.getId());

		boolean isLiked = likesService.isLikedBySongAndMember(song.getId(), member.getId());
		return SongDetailsResponseDto.of(song, albumCoverImageUrl, isLiked,
			likesService.getSongLikesCount(song.getId()));
	}

	// Todo : 트랜잭션 적용 필요
	@DistributedLock(value = "#songId")
	public void incrementStreamingCount(Long songId) {
		String key = STREAMING_COUNT_KEY;
		Double streamingCount = redisTemplate.opsForZSet().incrementScore(key, songId.toString(), 1);
		log.info("Incremented streaming count for song {}: {}", songId, streamingCount);
	}

	@Async
	@Transactional
	public CompletableFuture<Void> createMeltingSong(
		String email, Long originalSongId, MultipartFile voiceFile) {

		OriginalSong originalSong = originalSongRepository.findById(originalSongId).orElseThrow(RuntimeException::new);
		Member member = memberRepository.findByEmail(email).orElseThrow(RuntimeException::new);

		Song song = songRepository.findByMemberAndOriginalSongAndSongType(member, originalSong, SongType.MELTING)
			.orElse(null);

		boolean isNewSong = false;

		if (song == null) {
			song = Song.builder()
				.originalSong(originalSong)
				.member(member)
				.songType(SongType.MELTING)
				.songUrl("")
				.build();
			isNewSong = true;
		} else {
			song.updateSongUrl("");
		}

		Song savedSong = songRepository.save(song);

		log.info("{} Song with ID: {}", isNewSong ? "Created new" : "Updated existing", savedSong.getId());

		MultipartBodyBuilder builder = new MultipartBodyBuilder();
		builder.part("voice_file", voiceFile.getResource());
		builder.part("song_id", savedSong.getId().toString());
		builder.part("original_song_mr_url", originalSong.getMrUrl());

		String endpoint;
		if (member.getCoverCount() < 3 && isNewSong) {
			endpoint = "/api/rvc-ai/{memberId}/melting-with-training";
			member.increaseCoverCount();
			memberRepository.save(member);
		} else {
			endpoint = "/api/rvc-ai/{memberId}/melting";
		}

		return webClient.post()
			.uri(uriBuilder -> uriBuilder
				.path(endpoint)
				.build(member.getId()))
			.contentType(MediaType.MULTIPART_FORM_DATA)
			.body(BodyInserters.fromMultipartData(builder.build()))
			.retrieve()
			.bodyToMono(Void.class)
			.toFuture();
	}

	@Async
	@Transactional
	public CompletableFuture<Void> createAiCoverSong(
		String email, Long originalSongId) {

		OriginalSong originalSong = originalSongRepository.findById(originalSongId).orElseThrow(RuntimeException::new);
		Member member = memberRepository.findByEmail(email).orElseThrow(RuntimeException::new);

		if (!member.isAiCoverEnabled()) {
			throw new RuntimeException();
		}

		Song song = songRepository.findByMemberAndOriginalSongAndSongType(member, originalSong, SongType.AICOVER)
			.orElse(null);

		boolean isNewSong = false;

		if (song == null) {
			song = Song.builder()
				.originalSong(originalSong)
				.member(member)
				.songType(SongType.AICOVER)
				.songUrl("")
				.build();
			isNewSong = true;
		} else {
			song.updateSongUrl("");
		}

		Song savedSong = songRepository.save(song);

		log.info("{} Song with ID: {}", isNewSong ? "Created new" : "Updated existing", savedSong.getId());

		Map<String, Object> requestBody = Map.of(
			"song_id", savedSong.getId().toString(),
			"original_song_mr_url", originalSong.getMrUrl(),
			"original_song_voice_url", originalSong.getVoiceUrl(),
			"member_gender", convertGender(member.getGender()),
			"original_voice_gender", convertGender(originalSong.getArtistGender())
		);

		return webClient.post()
			.uri("/api/rvc-ai/{memberId}/aicover", member.getId())
			.contentType(MediaType.APPLICATION_JSON)
			.body(BodyInserters.fromValue(requestBody))
			.retrieve()
			.bodyToMono(Void.class)
			.toFuture();

	}

	@Transactional
	public void updateSongUrl(String songId, String songUrl) {
		Song song = songRepository.findById(Long.parseLong(songId)).orElseThrow(RuntimeException::new);
		song.updateSongUrl(songUrl);
		songRepository.save(song);
	}

	private String convertGender(Gender gender) {
		return gender.getGender().toUpperCase();
	}

	public SongSearchPageResponseDto getSongsForAlbumCreation(String email, String keyword, int page, int size) {
		Member member = memberRepository.findByEmail(email)
			.orElseThrow(() -> new BusinessException(ErrorMessage.MEMBER_NOT_FOUND));
		List<Song> songs;
		if (keyword == null || keyword.trim().isEmpty()) {
			songs = songRepository.findAllSongsForAlbumCreation(member.getId());
		} else {
			songs = songRepository.findSongsForAlbumCreation(member.getId(), keyword);
		}

		Map<OriginalSong, List<Song>> groupedByOriginal = songs.stream()
			.collect(Collectors.groupingBy(Song::getOriginalSong));
		List<SongSearchResponseDto> groupedSongsList = new ArrayList<>();
		for (OriginalSong originalSong : groupedByOriginal.keySet()) {
			List<Song> songList = groupedByOriginal.get(originalSong);
			Long meltingSongId = null;
			Long aiCoverSongId = null;
			for (Song song : songList) {
				if (song.getSongType().equals(SongType.MELTING)) {
					meltingSongId = song.getId();
				} else if (song.getSongType().equals(SongType.AICOVER)) {
					aiCoverSongId = song.getId();
				}
			}
			groupedSongsList.add(SongSearchResponseDto.of(
				originalSong, awsS3Service.getDefaultCoverImageUrl(), meltingSongId, aiCoverSongId));
		}

		int start = (int)PageRequest.of(page, size).getOffset();
		int end = Math.min((start + size), groupedSongsList.size());
		Page<SongSearchResponseDto> pageOfSongs = new PageImpl<>(groupedSongsList.subList(start, end),
			PageRequest.of(page, size), groupedSongsList.size());
		return SongSearchPageResponseDto.of(pageOfSongs);
	}

	public SongLikesPageResponseDto getMemberLikesSongs(Long memberId, int sort, int page, int size) {
		Pageable pageable = PageRequest.of(page, size);
		Page<Song> songPage;
		if (sort == 1) {
			songPage = songRepository.findLikedSongsByMemberIdOrderByLikesCountDesc(memberId, pageable);
		} else {
			songPage = songRepository.findLikedSongsByMemberIdOrderByCreatedAtDesc(memberId, pageable);
		}
		Page<SongLikesResponseDto> songLikesResponseDtoPage = songPage.map(song -> SongLikesResponseDto.of(song,
			song.getAlbum() != null ? song.getAlbum().getAlbumCoverImageUrl() : awsS3Service.getDefaultCoverImageUrl(),
			likesService.isLikedBySongAndMember(song.getId(), memberId), likesService.getSongLikesCount(song.getId())));
		return SongLikesPageResponseDto.of(songLikesResponseDtoPage);
	}

	public Integer getSongLikesCount(Long songId) {
		return likesService.getSongLikesCount(songId);
	}

	public Integer increaseSongLikes(Long songId, String email) {
		Member member = memberRepository.findByEmail(email)
			.orElseThrow(() -> new BusinessException(ErrorMessage.MEMBER_NOT_FOUND));
		return likesService.increaseSongLikes(songId, member.getId());
	}

	public Integer decreaseSongLikes(Long songId, String email) {
		Member member = memberRepository.findByEmail(email)
			.orElseThrow(() -> new BusinessException(ErrorMessage.MEMBER_NOT_FOUND));
		return likesService.decreaseSongLikes(songId, member.getId());
	}

	@Transactional(readOnly = true)
	public List<Song> idListToSongList(List<Long> idList) {
		return idList.stream().map(songId -> songRepository.findById(songId)
			.orElseThrow(() -> new BusinessException(ErrorMessage.SONG_NOT_FOUND))).toList();
	}
}
