package com.dayangsung.melting.domain.voice.controller;

import com.dayangsung.melting.domain.auth.dto.CustomOAuth2User;
import com.dayangsung.melting.domain.voice.dto.request.VoiceCreateRequest;
import com.dayangsung.melting.domain.voice.dto.response.VoiceCreateResponse;
import com.dayangsung.melting.domain.voice.service.VoiceService;
import com.dayangsung.melting.global.common.response.ApiResponse;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/v1/members")
@RequiredArgsConstructor
public class VoiceController {

    private final VoiceService voiceService;

    @PostMapping(value = "/me/voices", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiResponse<VoiceCreateResponse> addVoice(
            @RequestBody VoiceCreateRequest voiceCreateRequest,
            @AuthenticationPrincipal CustomOAuth2User customOAuth2User) throws IOException {
        VoiceCreateResponse response = voiceService.addVoice(voiceCreateRequest, customOAuth2User.getId());
        return ApiResponse.ok(response);
    }


}
