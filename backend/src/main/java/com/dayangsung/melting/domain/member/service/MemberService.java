package com.dayangsung.melting.domain.member.service;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.dayangsung.melting.domain.album.dto.response.AlbumMyPageResponseDto;
import com.dayangsung.melting.domain.album.service.AlbumService;
import com.dayangsung.melting.domain.hashtag.entity.MemberHashtag;
import com.dayangsung.melting.domain.hashtag.service.HashtagService;
import com.dayangsung.melting.domain.likes.service.LikesService;
import com.dayangsung.melting.domain.member.dto.SongListDto;
import com.dayangsung.melting.domain.member.dto.response.MemberResponseDto;
import com.dayangsung.melting.domain.member.dto.response.MemberSongResponseDto;
import com.dayangsung.melting.domain.member.entity.Member;
import com.dayangsung.melting.domain.member.enums.Gender;
import com.dayangsung.melting.domain.member.repository.MemberRepository;
import com.dayangsung.melting.domain.originalsong.entity.OriginalSong;
import com.dayangsung.melting.domain.song.dto.SongMyPageDto;
import com.dayangsung.melting.domain.song.dto.response.SongLikesPageResponseDto;
import com.dayangsung.melting.domain.song.entity.Song;
import com.dayangsung.melting.domain.song.repository.SongRepository;
import com.dayangsung.melting.domain.song.service.SongService;
import com.dayangsung.melting.global.common.enums.ErrorMessage;
import com.dayangsung.melting.global.common.service.AwsS3Service;
import com.dayangsung.melting.global.exception.BusinessException;
import com.dayangsung.melting.global.util.CookieUtil;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class MemberService {

	private final AwsS3Service awsS3Service;
	private final MemberRepository memberRepository;
	private final SongRepository songRepository;
	private final AlbumService albumService;
	private final LikesService likesService;
	private final HashtagService hashtagService;
	private final SongService songService;

	public Boolean validateNickname(String nickname) {
		return !memberRepository.existsByNickname(nickname);
	}

	@Transactional
	public MemberResponseDto initMemberInfo(MultipartFile profileImage, String nickname, Gender gender, String email) {
		log.debug("member service nickname {}", nickname);
		String profileImageUrl = awsS3Service.getDefaultProfileImageUrl();
		Member member = memberRepository.findByEmail(email)
			.orElseThrow(() -> new BusinessException(ErrorMessage.MEMBER_NOT_FOUND));
		if (!profileImage.isEmpty()) {
			profileImageUrl = awsS3Service.uploadProfileImage(profileImage, member.getId());
		}
		member.initMember(gender, profileImageUrl, nickname);
		memberRepository.save(member);
		return MemberResponseDto.of(member);
	}

	public MemberResponseDto getMemberInfo(String email) {
		Member member = memberRepository.findByEmail(email)
			.orElseThrow(() -> new BusinessException(ErrorMessage.MEMBER_NOT_FOUND));
		return MemberResponseDto.of(member);
	}

	@Transactional
	public MemberResponseDto updateMemberInfo(MultipartFile multipartFile, String nickname, String email) {
		Member member = memberRepository.findByEmail(email)
			.orElseThrow(() -> new BusinessException(ErrorMessage.MEMBER_NOT_FOUND));
		if (nickname == null) {
			String profileImageUrl = awsS3Service.uploadProfileImage(multipartFile, member.getId());
			member.updateProfileImageUrl(profileImageUrl);
		} else {
			if (multipartFile.isEmpty()) {
				member.updateNickname(nickname);
			} else {
				String profileImageUrl = awsS3Service.uploadProfileImage(multipartFile, member.getId());
				member.updateMember(profileImageUrl, nickname);
			}
		}
		memberRepository.save(member);

		return MemberResponseDto.of(member);
	}

	public void logout(HttpServletRequest request, HttpServletResponse response) {
		CookieUtil.deleteCookie(request, response, "access_token");
		CookieUtil.deleteCookie(request, response, "refresh_token");
	}

	public MemberSongResponseDto getMemberSongs(String email) {
		Member member = memberRepository.findByEmail(email)
			.orElseThrow(() -> new BusinessException(ErrorMessage.MEMBER_NOT_FOUND));

		List<Song> memberSongs = songRepository.findByMemberId(member.getId());

		List<SongListDto> mySongList = memberSongs.stream()
			.collect(Collectors.groupingBy(Song::getOriginalSong))
			.entrySet().stream()
			.map(entry -> {
				OriginalSong originalSong = entry.getKey();
				List<SongMypageDto> songDtos = entry.getValue().stream()
					.map(song -> SongMypageDto.builder()
						.songId(song.getId())
						.albumCoverImageUrl(song.getAlbum() != null ? song.getAlbum().getAlbumCoverImageUrl() :
							awsS3Service.getDefaultCoverImageUrl())
						.songType(song.getSongType())
						.likeCount(likesService.getSongLikesCount(song.getId()))
						.isLiked(likesService.isLikedBySongAndMember(song.getId(), member.getId()))
						.isCreated(!song.getSongUrl().isEmpty())
						.createdAt(song.getCreatedAt())
						.build())
					.sorted(Comparator.comparing(SongMypageDto::songType))
					.collect(Collectors.toList());

				return SongListDto.of(originalSong, songDtos);
			})
			.sorted(Comparator.comparing(
				dto -> dto.songList().stream()
					.map(SongMypageDto::createdAt)
					.max(LocalDateTime::compareTo)
					.orElseThrow(),
				Comparator.reverseOrder()
			))
			.collect(Collectors.toList());

		return MemberSongResponseDto.of(mySongList, member.isAiCoverEnabled());
	}

	public List<String> getMemberHashtags(String email) {
		Member member = memberRepository.findByEmail(email)
			.orElseThrow(() -> new BusinessException(ErrorMessage.MEMBER_NOT_FOUND));
		List<MemberHashtag> memberHashtags = member.getMemberHashtags();
		return memberHashtags.stream()
			.map(memberHashtag -> memberHashtag.getHashtag().getContent())
			.toList();
	}

	public List<String> addMemberHashtags(String email, String content) {
		Member member = memberRepository.findByEmail(email)
			.orElseThrow(() -> new BusinessException(ErrorMessage.MEMBER_NOT_FOUND));
		List<MemberHashtag> memberHashtags = member.getMemberHashtags();
		if (memberHashtags.size() >= 5) {
			throw new BusinessException(ErrorMessage.MEMBER_HASHTAG_FULL);
		}
		hashtagService.addMemberHashtag(member, content);
		member = memberRepository.save(member);

		return member.getMemberHashtags().stream()
			.map(memberHashtag -> memberHashtag.getHashtag().getContent())
			.toList();
	}

	public List<String> deleteMemberHashtags(String email, String content) {
		Member member = memberRepository.findByEmail(email)
			.orElseThrow(() -> new BusinessException(ErrorMessage.MEMBER_NOT_FOUND));
		List<MemberHashtag> memberHashtags = member.getMemberHashtags();

		if (memberHashtags.isEmpty()) {
			throw new BusinessException(ErrorMessage.MEMBER_HASHTAG_EMPTY);
		}
		hashtagService.deleteMemberHashtag(member, content);
		member = memberRepository.save(member);

		return member.getMemberHashtags().stream()
			.map(memberHashtag -> memberHashtag.getHashtag().getContent())
			.toList();
	}

	@Transactional
	public void updateMemberModelStatus(String memberId) {
		Member member = memberRepository.findById(Long.parseLong(memberId)).orElseThrow(RuntimeException::new);

		if (member.getCoverCount() >= 3 && !member.isAiCoverEnabled()) {
			member.enableAiCover();
			memberRepository.save(member);
		}
	}

	public AlbumMyPageResponseDto getMemberAlbums(String email, int sort, int page, int size) {
		Member member = memberRepository.findByEmail(email)
			.orElseThrow(() -> new BusinessException(ErrorMessage.MEMBER_NOT_FOUND));
		return albumService.getMemberAlbums(member.getId(), sort, page, size);
	}

	public AlbumMyPageResponseDto getMemberLikesAlbums(String email, int sort, int page, int size) {
		Member member = memberRepository.findByEmail(email)
			.orElseThrow(() -> new BusinessException(ErrorMessage.MEMBER_NOT_FOUND));
		return albumService.getMemberLikesAlbums(member.getId(), sort, page, size);
	}

	public SongLikesPageResponseDto getMemberLikesSongs(String email, int sort, int page, int size) {
		Member member = memberRepository.findByEmail(email)
			.orElseThrow(() -> new BusinessException(ErrorMessage.MEMBER_NOT_FOUND));
		return songService.getMemberLikesSongs(member.getId(), sort, page, size);
	}
}
