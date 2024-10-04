package com.dayangsung.melting.global.handler;

import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionalEventListener;

import com.dayangsung.melting.domain.hashtag.dto.response.HashtagResponseDto;
import com.dayangsung.melting.domain.hashtag.service.HashtagService;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class HashtagEventHandler {

	private final HashtagService hashtagService;

	@TransactionalEventListener
	public void handleHashtagCreatedEvent(HashtagResponseDto hashtagResponseDto) {
		hashtagService.saveHashtag(hashtagResponseDto.content());
	}
}