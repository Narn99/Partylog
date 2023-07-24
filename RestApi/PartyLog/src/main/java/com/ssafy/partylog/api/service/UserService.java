package com.ssafy.partylog.api.service;

import com.ssafy.partylog.api.Entity.UserEntity;
import com.ssafy.partylog.api.request.UserRequest;

import java.util.Optional;

public interface UserService {

    String searchKakaoAccessToken(String code) throws Exception;

    String searchKakaoUserInfo(String kakao_Access_Token) throws Exception;

    UserEntity searchUserInfoByKakaoUserId(String userId) throws Exception;

    String createToken(int userNo, String type) throws Exception;

    void addUser(UserRequest userInfo) throws Exception;

    void addRefreshToken(int userNo, String refreshToken) throws Exception;
}
