package com.ssafy.partylog.exception;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum ErrorCode {
    // JWT
    EXPIRED_ACESS_TOKEN(400, "J001", "EXPIRED_TOKEN"), // 토큰 기한 만료
    INVALID_TOKEN(400, "J002", "INVALID_TOKEN"), // 유효하지 않은 토큰
    NO_TOKEN(400, "J003", "NO_TOKEN"); // 토큰이 null

    private int status;
    private String code;
    private String message;
}
