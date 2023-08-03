package com.ssafy.partylog.api.response;

import java.util.Date;

public class myPageResponse {
    private int userNo;
    private String userNickname;
    private Date userBirthday;
    private String userProfile;
    private LetterResponseBody letterResponseBody;
    private int followerSum; // 나를 팔로우 하는 사람 수
    private int followeeSum; // 내가 팔로우 하는 사람 수
}
