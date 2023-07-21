package com.ssafy.partylog.api.response;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

@Getter
@Setter
@ToString
public class UserResponse {

    private String userNo;
    private Date userBirthday;
    private String userNickname;
    private String userProfile;

    public UserResponse(int userNo, Date userBirthday, String userNickname, String userProfile) {
        this.userNo = makeUserCode(userNo);
        this.userBirthday = userBirthday;
        this.userNickname = userNickname;
        this.userProfile = userProfile;
    }

    public String makeUserCode(int userNo) {
        String prefix = "";
        for(int i=0; i<4-String.valueOf(userNo).length(); i++) {
            prefix += "0";
        }
        return prefix + String.valueOf(userNo);
    }

}
