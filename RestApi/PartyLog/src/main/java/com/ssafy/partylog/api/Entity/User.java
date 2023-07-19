package com.ssafy.partylog.api.Entity;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name="user")
@Getter
@ToString
public class User {
    @Id
    @Column(name="user_no")
    private int userNo;
    @Column(name="user_id")
    private String userId;
    @Column(name="user_birthday")
    private Date userBirthday;
    @Column(name="user_nickname")
    private String userNickname;
    @Column(name="user_profile")
    private String userProfile;

    @Builder
    public User(int userNo, String userId, Date userBirthday, String userNickname, String userProfile) {
        this.userNo = userNo;
        this.userId = userId;
        this.userBirthday = userBirthday;
        this.userNickname = userNickname;
        this.userProfile = userProfile;
    }

    // 기본 생성자 없으면 빨간줄 떠서 넣음
    public User() {
        
    }
}
