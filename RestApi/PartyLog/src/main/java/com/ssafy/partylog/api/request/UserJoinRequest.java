package com.ssafy.partylog.api.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

@Getter
@Setter
@ToString
@Builder
public class UserJoinRequest {
    @Schema(description = "사용자 번호", nullable = false, example = "1")
    private int userNo;
    @Schema(description = "사용자 생일", nullable = false, example = "1996-03-15")
    private Date userBirthday;
}
