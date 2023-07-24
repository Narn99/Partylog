package com.ssafy.partylog.api.service;

import com.ssafy.partylog.api.Entity.UserEntity;
import com.ssafy.partylog.api.request.UserRequest;

import java.util.Optional;

public interface UserService {

    public String searchKakaoAccessToken(String code) throws Exception;

    public String searchKakaoUserInfo(String kakao_Access_Token) throws Exception;

    public UserEntity addKakaoUserId(String kakao_auth_id) throws Exception;

    public void addUser(UserRequest userInfo) throws Exception;

    public Optional<UserEntity> searchUserInfoByKakaoUserId(String userId) throws Exception;

    public void addRefreshToken(int userNo, String type, String refreshToken) throws Exception;
}
