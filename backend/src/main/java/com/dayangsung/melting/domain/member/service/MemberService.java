package com.dayangsung.melting.domain.member.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.dayangsung.melting.domain.member.dto.response.MemberResponseDto;
import com.dayangsung.melting.domain.member.entity.Member;
import com.dayangsung.melting.domain.member.enums.Gender;
import com.dayangsung.melting.domain.member.repository.MemberRepository;
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

	public Boolean validateNickname(String nickname) {
		return !memberRepository.existsByNickname(nickname);
	}

	public MemberResponseDto initMemberInfo(MultipartFile profileImage, String nickname, Gender gender, Long memberId) {
		String profileImageUrl = null;
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

	public MemberResponseDto updateMemberInfo(MultipartFile multipartFile, String nickname, Long memberId) {
		if (multipartFile.isEmpty() && nickname.isEmpty()) {
			throw new RuntimeException();
		}
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
}
