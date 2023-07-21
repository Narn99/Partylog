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
public class UserRequest {
    @Schema(description = "사용자 번호", nullable = false, example = "0001")
    private String userNo;
    @Schema(description = "사용자 생일", nullable = false, example = "1996-03-15")
    private Date userBirthday;
    @Schema(description = "사용자 닉네임", nullable = false, example = "김싸피")
    private String userNickname;
    @Schema(description = "사용자 프로필 이미지", nullable = true, example = "http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_640x640.jpg")
    private String userProfile;

    @Builder
    public UserRequest(String userNo, Date userBirthday, String userNickname, String userProfile) {
        this.userNo = userNo;
        this.userBirthday = userBirthday;
        this.userNickname = userNickname;
        this.userProfile = userProfile;
    }

    // dto -> entity로 변환
//    public UserEntity toEntity() {
//        return UserEntity.builder()
//                .userNo(Integer.parseInt(this.userNo))
//                .userBirthday(this.userBirthday)
//                .userNickname(this.userNickname)
//                .userProfile(this.userProfile)
//                .build();
//    }
}
