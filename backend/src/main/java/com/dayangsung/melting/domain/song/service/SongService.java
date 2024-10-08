package com.dayangsung.melting.domain.song.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.dayangsung.melting.domain.likes.service.LikesService;
import com.dayangsung.melting.domain.member.entity.Member;
import com.dayangsung.melting.domain.member.enums.Gender;
import com.dayangsung.melting.domain.member.repository.MemberRepository;
import com.dayangsung.melting.domain.originalsong.entity.OriginalSong;
import com.dayangsung.melting.domain.originalsong.repository.OriginalSongRepository;
import com.dayangsung.melting.domain.song.dto.AiCoverRedisPubDto;
import com.dayangsung.melting.domain.song.dto.MeltingRedisPubDto;
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
import com.dayangsung.melting.global.util.AwsS3Util;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class SongService {

	private final SongRepository songRepository;
	private final MemberRepository memberRepository;
	private final OriginalSongRepository originalSongRepository;
	private final AwsS3Service awsS3Service;
	private final LikesService likesService;
	private final AwsS3Util awsS3Util;
	private final RedisTemplate<String, Object> redisTemplate;

	private static final String DAILY_STREAMING_KEY = "album:streaming:daily";
	private static final String MONTHLY_STREAMING_KEY = "album:streaming:monthly";

	public List<Song> getSongListByMemberId(Long memberId) {
		return songRepository.findByMemberId(memberId);
	}

	@Transactional
	public SongDetailsResponseDto getSongDetails(Long songId, String email) {
		Song song = songRepository.findById(songId)
			.orElseThrow(() -> new BusinessException(ErrorMessage.SONG_NOT_FOUND));
		Member member = memberRepository.findByEmail(email)
			.orElseThrow(() -> new BusinessException(ErrorMessage.MEMBER_NOT_FOUND));

		String albumCoverImageUrl = awsS3Util.getDefaultCoverImageUrl();
		if (song.getAlbum() != null) {
			albumCoverImageUrl = song.getAlbum().getAlbumCoverImageUrl();
		}
		incrementStreamingCount(song.getId());

		boolean isLiked = likesService.isLikedBySongAndMember(song.getId(), member.getId());
		return SongDetailsResponseDto.of(song, albumCoverImageUrl, isLiked,
			likesService.getSongLikesCount(song.getId()));
	}

	@DistributedLock(value = "#songId")
	public void incrementStreamingCount(Long songId) {
		Song song = songRepository.findById(songId)
			.orElseThrow(() -> new BusinessException(ErrorMessage.SONG_NOT_FOUND));
		if (song.getAlbum() != null) {
			Double dailyStreamingCount = redisTemplate.opsForZSet()
				.incrementScore(DAILY_STREAMING_KEY, song.getAlbum().getId(), 1);
			Double monthLyStreamingCount = redisTemplate.opsForZSet()
				.incrementScore(MONTHLY_STREAMING_KEY, song.getAlbum().getId(), 1);
			log.info("Incremented streaming count for album {}: {}", songId, dailyStreamingCount,
				monthLyStreamingCount);
		}
	}

	// @Async
	@Transactional
	public void createMeltingSong(String email, Long originalSongId, MultipartFile voiceFile) {
		Member member = memberRepository.findByEmail(email)
			.orElseThrow(() -> new BusinessException(ErrorMessage.MEMBER_NOT_FOUND));
		OriginalSong originalSong = originalSongRepository.findById(originalSongId)
			.orElseThrow(() -> new BusinessException(ErrorMessage.ORIGINAL_SONG_NOT_FOUND));
		Song song =
			songRepository.findByMemberIdAndOriginalSongIdAndSongType(member.getId(), originalSongId, SongType.MELTING)
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

		String userVoiceUrl = awsS3Service.uploadVoice(voiceFile, member.getId(), originalSongId);

		boolean endpoint;
		if (member.getCoverCount() < 3 && isNewSong) {
			endpoint = true;
			member.increaseCoverCount();
			memberRepository.save(member);
		} else {
			endpoint = false;
		}

		MeltingRedisPubDto meltingRedisPubDto = MeltingRedisPubDto.builder()
			.userVoiceUrl(userVoiceUrl)
			.singerVoiceUrl(originalSong.getVoiceUrl())
			.mrUrl(originalSong.getMrUrl())
			.memberId(member.getId())
			.songId(savedSong.getId())
			.endpoint(endpoint)
			.build();

		redisTemplate.convertAndSend("melting_song_channel", meltingRedisPubDto);
		// return CompletableFuture.completedFuture(null);
		// return true;
	}

	@Transactional
	public void createAiCoverSong(String email, Long originalSongId) {

		OriginalSong originalSong = originalSongRepository.findById(originalSongId)
			.orElseThrow(() -> new BusinessException(ErrorMessage.ORIGINAL_SONG_NOT_FOUND));
		Member member = memberRepository.findByEmail(email)
			.orElseThrow(() -> new BusinessException(ErrorMessage.MEMBER_NOT_FOUND));

		if (!member.isAiCoverEnabled()) {
			throw new BusinessException(ErrorMessage.MEMBER_AICOVER_DISABLE);
		}

		Song song = songRepository.findByMemberIdAndOriginalSongIdAndSongType(member.getId(), originalSongId,
				SongType.AICOVER)
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

		AiCoverRedisPubDto aiCoverRedisPubDto = AiCoverRedisPubDto.builder()
			.memberId(member.getId())
			.songId(savedSong.getId())
			.originalSongMrUrl(originalSong.getMrUrl())
			.originalSongVoiceUrl(originalSong.getVoiceUrl())
			.memberGender(member.getGender().toString())
			.originalVoiceGender(originalSong.getArtistGender().toString())
			.build();

		redisTemplate.convertAndSend("ai_cover_song_channel", aiCoverRedisPubDto);
	}

	@Transactional
	public void updateSongUrl(String songId, String songUrl) {
		Song song = songRepository.findById(Long.parseLong(songId))
			.orElseThrow(() -> new BusinessException(ErrorMessage.SONG_NOT_FOUND));
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
				originalSong, awsS3Util.getDefaultCoverImageUrl(), meltingSongId, aiCoverSongId));
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
			song.getAlbum() != null ? song.getAlbum().getAlbumCoverImageUrl() : awsS3Util.getDefaultCoverImageUrl(),
			likesService.isLikedBySongAndMember(song.getId(), memberId), likesService.getSongLikesCount(song.getId())));
		return SongLikesPageResponseDto.of(songLikesResponseDtoPage);
	}

	public Integer getSongLikesCount(Long songId) {
		return likesService.getSongLikesCount(songId);
	}

	@Transactional
	public Integer increaseSongLikes(Long songId, String email) {
		Member member = memberRepository.findByEmail(email)
			.orElseThrow(() -> new BusinessException(ErrorMessage.MEMBER_NOT_FOUND));
		return likesService.increaseSongLikes(songId, member.getId());
	}

	@Transactional
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
