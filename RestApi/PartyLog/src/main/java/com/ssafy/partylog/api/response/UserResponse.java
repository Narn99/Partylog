package com.ssafy.partylog.api.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@Builder
public class UserResponse {
    private int userNo;
    private String code;
    private String message;
}
