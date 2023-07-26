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
    private Date userBirthday;
    private String userNickname;
    private String userProfile;
    private String accessToken;
    private String refreshToken;
}
