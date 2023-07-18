package com.ssafy.partylog.api.domain;

import lombok.Data;

import javax.persistence.*;
import java.sql.Date;
import java.util.Objects;
@Data
@Entity
@Table(name = "user", schema = "s09p12a501")
public class UserEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "user_no")
    private int userNo;
    @Basic
    @Column(name = "user_id")
    private String userId;
    @Basic
    @Column(name = "user_birthday")
    private Date userBirthday;
    @Basic
    @Column(name = "user_nickname")
    private String userNickname;
    @Basic
    @Column(name = "user_profile")
    private String userProfile;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserEntity that = (UserEntity) o;
        return userNo == that.userNo && Objects.equals(userId, that.userId) && Objects.equals(userBirthday, that.userBirthday) && Objects.equals(userNickname, that.userNickname) && Objects.equals(userProfile, that.userProfile);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userNo, userId, userBirthday, userNickname, userProfile);
    }
}
