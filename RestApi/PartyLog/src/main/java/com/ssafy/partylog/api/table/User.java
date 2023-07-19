package com.ssafy.partylog.api.table;

import lombok.ToString;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.util.Date;

@Entity
@SuperBuilder
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

    public User() {

    }
}
