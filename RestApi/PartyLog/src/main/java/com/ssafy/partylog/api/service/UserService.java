package com.ssafy.partylog.api.service;

import com.ssafy.partylog.api.Entity.UserEntity;
import com.ssafy.partylog.api.request.UserRequest;

public interface UserService {

    UserEntity searchKakaoAccessToken(String code) throws Exception;

    UserEntity searchKakaoUserInfo(String kakao_Access_Token) throws Exception;

    String createToken(int userNo, String type) throws Exception;

    boolean join(UserRequest userInfo) throws Exception;

    void saveRefreshToken(int userNo, String refreshToken) throws Exception;

    UserEntity searchUserInfoByUserNo(int userNo) throws Exception;

    void logout(int userNo) throws Exception;
}
