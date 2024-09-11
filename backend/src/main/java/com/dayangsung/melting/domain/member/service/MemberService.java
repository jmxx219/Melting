package com.dayangsung.melting.domain.member.service;

import org.springframework.stereotype.Service;

import com.dayangsung.melting.domain.auth.dto.CustomOAuth2User;
import com.dayangsung.melting.domain.member.dto.response.MemberResponseDto;
import com.dayangsung.melting.domain.member.entity.Member;
import com.dayangsung.melting.domain.member.enums.Gender;
import com.dayangsung.melting.domain.member.repository.MemberRepository;
import com.dayangsung.melting.global.common.service.FileService;
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
	private final FileService fileService;
	private final MemberRepository memberRepository;

	public Boolean nicknameCheck(String nickname) {
		return memberRepository.existsByNickname(nickname);
	}

	public MemberResponseDto initMemberInfo(String profileImage, String nickname, Gender gender, String email) {
		String imageSignedUrl = fileService.getImageSignedUrl(profileImage);
		Member member = memberRepository.findByEmail(email)
			.orElseThrow(RuntimeException::new); // TODO : 예외 처리
		member.initMember(gender, imageSignedUrl, nickname);
		memberRepository.save(member);

		return MemberResponseDto.of(member);
	}

	public MemberResponseDto getMemberInfo(CustomOAuth2User customOAuth2User) {
		Member member = memberRepository.findByEmail(customOAuth2User.getName())
			.orElseThrow(RuntimeException::new);
		return MemberResponseDto.of(member);
	}

	public MemberResponseDto updateMemberInfo(String nickname, String profileImageFileName, String email) {
		Member member = memberRepository.findByEmail(email).orElseThrow(RuntimeException::new);
		String imageSignedUrl = fileService.getImageSignedUrl(profileImageFileName);
		member.updateMember(imageSignedUrl, nickname);
		memberRepository.save(member);

		return MemberResponseDto.of(member);
	}

	public void logout(HttpServletRequest request, HttpServletResponse response) {
		cookieUtil.deleteJwtCookies(request, response);
	}
}
