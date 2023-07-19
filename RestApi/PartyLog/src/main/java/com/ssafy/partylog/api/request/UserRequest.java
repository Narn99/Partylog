package com.ssafy.partylog.api.request;

import com.ssafy.partylog.api.Entity.User;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import java.util.Date;

@Getter
@Setter
@ToString
public class UserRequest {
    private String userId;
    private Date userBirthday;
    private String userNickname;
    private String userProfile;

    @Builder
    public UserRequest(String userId, Date userBirthday, String userNickname, String userProfile) {
        this.userId = userId;
        this.userBirthday = userBirthday;
        this.userNickname = userNickname;
        this.userProfile = userProfile;
    }

    // dto -> entity로 변환
    public User toEntity() {
        return User.builder()
                .userId(this.userId)
                .userBirthday(this.userBirthday)
                .userNickname(this.userNickname)
                .userProfile(this.userProfile)
                .build();
    }
}
