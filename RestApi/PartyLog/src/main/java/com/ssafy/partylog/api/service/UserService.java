package com.ssafy.partylog.api.service;

import com.ssafy.partylog.api.Entity.UserEntity;
import com.ssafy.partylog.api.request.UserRequest;
import com.ssafy.partylog.api.response.UserSearchResponseBody;

import java.util.List;

public interface UserService {

    UserEntity searchKakaoAccessToken(String code) throws Exception;

    UserEntity searchKakaoUserInfo(String kakao_Access_Token) throws Exception;

    String createToken(int userNo, String type) throws Exception;

    boolean join(UserRequest userInfo) throws Exception;

    void saveRefreshToken(int userNo, String refreshToken) throws Exception;

    UserEntity searchUserInfoByUserNo(int userNo) throws Exception;

    String searchRefreshToken(String requestToken) throws Exception;

    boolean logout(int userNo) throws Exception;

    List<UserSearchResponseBody> searchUser(String userNickname, int userNo, int limit, int offset);
}
