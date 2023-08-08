package com.ssafy.partylog.api.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

@Getter
@Setter
@Builder
@ToString
public class LiveRequest {
    @Schema(description = "라이브 아이디", nullable = false, example = "session1010")
    String liveId;
    @Schema(description = "라이브 제목", nullable = true, example = "김싸피의 생일 축하방")
    String liveTitle;
    @Schema(description = "라이브 시작 날짜 및 시간", nullable = false, example = "2023-08-08 17:05:28")
    Date liveStartTime;
    @Schema(description = "라이브 설명", nullable = true, example = "생일을 축하해주기 위해 만든 방입니다.")
    String liveDesc;
}
