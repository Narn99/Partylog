package com.ssafy.partylog.exception;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Arrays;

@Getter
@AllArgsConstructor
@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum ErrorCode {
    // JWT
    EXPIRED_ACESS_TOKEN(400, "J001", "EXPIRED_ACESS_TOKEN"), // 엑세스 토큰 만료
    EXPIRED_REFRESH_TOKEN(400, "J002", "EXPIRED_REFRESH_TOKEN"), // 리프레시 토큰 만료
    INVALID_TOKEN(400, "J003", "INVALID_TOKEN"), // 유효하지 않은 토큰
    NO_TOKEN(400, "J004", "NO_TOKEN"); // 토큰이 null

    private int status;
    private String code;
    private String message;
}
