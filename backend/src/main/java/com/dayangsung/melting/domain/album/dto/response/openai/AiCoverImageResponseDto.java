
package com.dayangsung.melting.domain.album.dto.response.openai;


import java.util.List;

import lombok.Data;

/**
 * OpenAI API 형식과 일치하도록 작성하였음
 */

@Data
public class AiCoverImageResponseDto {
	long created;
	List<ImageObject> data;
}