package com.ssafy.partylog.api.response;

import com.ssafy.partylog.api.Entity.User;
import lombok.Getter;

import java.util.Date;

@Getter
public class UserResponse {
    private int userNo;
    private String userId;
    private Date userBirthday;
    private String userNickname;
    private String userProfile;

    // entity -> dto
    public UserResponse(User entity) {
        this.userNo = entity.getUserNo();
        this.userId = entity.getUserId();
        this.userBirthday = entity.getUserBirthday();
        this.userNickname = entity.getUserNickname();
        this.userProfile = entity.getUserProfile();
    }

}
