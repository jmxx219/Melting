package com.dayangsung.melting.domain.member.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.dayangsung.melting.domain.likes.service.LikesService;
import com.dayangsung.melting.domain.member.dto.response.MemberResponseDto;
import com.dayangsung.melting.domain.member.dto.response.MemberSongResponseDto;
import com.dayangsung.melting.domain.member.entity.Member;
import com.dayangsung.melting.domain.member.enums.Gender;
import com.dayangsung.melting.domain.member.repository.MemberRepository;
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

	private final CookieUtil cookieUtil;
	private final AwsS3Service awsS3Service;
	private final MemberRepository memberRepository;
	private final SongRepository songRepository;
	private final LikesService likesService;

	public Boolean validateNickname(String nickname) {
		return !memberRepository.existsByNickname(nickname);
	}

	@Transactional
	public MemberResponseDto initMemberInfo(MultipartFile profileImage, String nickname, Gender gender, Long memberId) {
		String profileImageUrl = awsS3Service.getDefaultProfileImageUrl();
		if (!profileImage.isEmpty()) {
			profileImageUrl = awsS3Service.uploadProfileImage(profileImage, memberId, null);
		}
		Member member = memberRepository.findById(memberId)
			.orElseThrow(RuntimeException::new);
		member.initMember(gender, profileImageUrl, nickname);
		memberRepository.save(member);
		return MemberResponseDto.of(member);
	}

	public MemberResponseDto getMemberInfo(Long memberId) {
		Member member = memberRepository.findById(memberId)
			.orElseThrow(RuntimeException::new);
		return MemberResponseDto.of(member);
	}

	@Transactional
	public MemberResponseDto updateMemberInfo(MultipartFile multipartFile, String nickname, Long memberId) {
		Member member = memberRepository.findById(memberId).orElseThrow(RuntimeException::new);
		String newFileName = multipartFile.getOriginalFilename();
		if (nickname == null) {
			String extension = newFileName.substring(newFileName.lastIndexOf(".") + 1).toLowerCase();
			member.updateProfileImageExtension(extension);
			awsS3Service.uploadProfileImage(multipartFile, memberId,
				member.getProfileImageExtension());
		} else {
			if (multipartFile.isEmpty()) {
				member.updateNickname(nickname);
			} else {
				String profileImageUrl = awsS3Service.uploadProfileImage(multipartFile, memberId,
					member.getProfileImageExtension());
				member.updateMember(profileImageUrl, nickname);
			}
		}
		memberRepository.save(member);

		return MemberResponseDto.of(member);
	}

	public void logout(HttpServletRequest request, HttpServletResponse response) {
		cookieUtil.deleteJwtCookies(request, response);
	}

	public List<MemberSongResponseDto> getMemberSongs(Long memberId) {
		List<Song> membersongs = songRepository.findByMemberIdAndIsDeletedFalse(memberId);
		return membersongs.stream()
			.map(song -> MemberSongResponseDto.of(
				song,
				song.getAlbum().getAlbumCoverImage(),
				likesService.getSongLikesCount(song.getId())
			))
			.collect(Collectors.toList());
	}
}
