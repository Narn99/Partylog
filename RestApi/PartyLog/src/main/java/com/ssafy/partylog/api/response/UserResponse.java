package com.ssafy.partylog.api.response;

import com.ssafy.partylog.api.Entity.User;
import lombok.Getter;
import lombok.ToString;

import java.util.Date;

@Getter
@ToString
public class UserResponse {
    private String userNo;
    private String userId;
    private Date userBirthday;
    private String userNickname;
    private String userProfile;

    // entity -> dto
    public UserResponse(User entity) {
        String prefix = "";
        for(int i=0; i<4-String.valueOf(entity.getUserNo()).length(); i++) {
            prefix += "0";
        }
        System.out.println("접두사: " + prefix);
        System.out.println("회원번호: " + entity.getUserNo());
        this.userNo = prefix + String.valueOf(entity.getUserNo());
        this.userId = entity.getUserId();
        this.userBirthday = entity.getUserBirthday();
        this.userNickname = entity.getUserNickname();
        this.userProfile = entity.getUserProfile();
    }

}
