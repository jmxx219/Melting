package com.dayangsung.melting.domain.member.service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.dayangsung.melting.domain.likes.service.LikesService;
import com.dayangsung.melting.domain.member.dto.SongListDto;
import com.dayangsung.melting.domain.member.dto.response.MemberResponseDto;
import com.dayangsung.melting.domain.member.dto.response.MemberSongResponseDto;
import com.dayangsung.melting.domain.member.entity.Member;
import com.dayangsung.melting.domain.member.enums.Gender;
import com.dayangsung.melting.domain.member.repository.MemberRepository;
import com.dayangsung.melting.domain.originalsong.entity.OriginalSong;
import com.dayangsung.melting.domain.song.dto.SongMypageDto;
import com.dayangsung.melting.domain.song.entity.Song;
import com.dayangsung.melting.domain.song.repository.SongRepository;
import com.dayangsung.melting.global.common.service.AwsS3Service;
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
	private final LikesService likesService;

	public Boolean validateNickname(String nickname) {
		return !memberRepository.existsByNickname(nickname);
	}

	@Transactional
	public MemberResponseDto initMemberInfo(MultipartFile profileImage, String nickname, Gender gender, String email) {
		log.debug("member service nickname {}", nickname);
		String profileImageUrl = awsS3Service.getDefaultProfileImageUrl();
		Member member = memberRepository.findByEmail(email).orElseThrow(RuntimeException::new);
		if (!profileImage.isEmpty()) {
			profileImageUrl = awsS3Service.uploadProfileImage(profileImage, member.getId(), null);
		}
		member.initMember(gender, profileImageUrl, nickname);
		memberRepository.save(member);
		return MemberResponseDto.of(member);
	}

	public MemberResponseDto getMemberInfo(String email) {
		Member member = memberRepository.findByEmail(email)
			.orElseThrow(RuntimeException::new);
		return MemberResponseDto.of(member);
	}

	@Transactional
	public MemberResponseDto updateMemberInfo(MultipartFile multipartFile, String nickname, String email) {
		Member member = memberRepository.findByEmail(email).orElseThrow(RuntimeException::new);
		String newFileName = multipartFile.getOriginalFilename();
		if (nickname == null) {
			String extension = newFileName.substring(newFileName.lastIndexOf(".") + 1).toLowerCase();
			member.updateProfileImageExtension(extension);
			awsS3Service.uploadProfileImage(multipartFile, member.getId(),
				member.getProfileImageExtension());
		} else {
			if (multipartFile.isEmpty()) {
				member.updateNickname(nickname);
			} else {
				String profileImageUrl = awsS3Service.uploadProfileImage(multipartFile, member.getId(),
					member.getProfileImageExtension());
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

	public MemberSongResponseDto getMemberSongs(Long memberId) {
		Member member = memberRepository.findById(memberId).orElseThrow(RuntimeException::new);

		List<Song> memberSongs = songRepository.findByMemberIdAndIsDeletedFalse(member.getId());

		Map<OriginalSong, List<Song>> groupedSongs = memberSongs.stream()
			.collect(Collectors.groupingBy(Song::getOriginalSong));

		List<SongListDto> mySongList = groupedSongs.entrySet().stream()
			.map(entry -> {
				OriginalSong originalSong = entry.getKey();
				List<Song> songs = entry.getValue();

				List<SongMypageDto> songMypageDtoList = songs.stream()
					.map(song -> SongMypageDto.builder()
						.songId(song.getId())
						.albumCoverImageUrl(song.getAlbum() != null ? song.getAlbum().getAlbumCoverImage() :
							awsS3Service.getDefaultSongCoverImageUrl())
						.songType(song.getSongType())
						.likeCount(likesService.getSongLikesCount(song.getId()))
						.isLiked(likesService.isLikedBySongAndMember(song.getId(), memberId))
						.build())
					.collect(Collectors.toList());

				return SongListDto.of(originalSong, songMypageDtoList);
			})
			.collect(Collectors.toList());

		boolean isPossibleAiCover = member.getCoverCount() >= 3;

		return MemberSongResponseDto.of(mySongList, isPossibleAiCover);
	}
}
