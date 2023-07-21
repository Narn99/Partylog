package com.ssafy.partylog.api.request;

import com.ssafy.partylog.api.Entity.User;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

@Getter
@Setter
@ToString
public class UserRequest {
    @Schema(description = "카카오 고유 ID", nullable = false, example = "2913103441")
    private String userId;
    @Schema(description = "사용자 생일", nullable = false, example = "1996-03-15")
    private Date userBirthday;
    @Schema(description = "사용자 닉네임", nullable = false, example = "김싸피")
    private String userNickname;
    @Schema(description = "사용자 프로필 이미지", nullable = true, example = "http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_640x640.jpg")
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
