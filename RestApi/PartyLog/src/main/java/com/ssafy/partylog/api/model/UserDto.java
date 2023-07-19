package com.ssafy.partylog.api.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import java.util.Date;

@Getter
@Setter
@ToString
public class UserDto {
    private int userNo;
    private String userId;
    private Date userBirthday;
    private String userNickname;
    private String userProfile;
}
