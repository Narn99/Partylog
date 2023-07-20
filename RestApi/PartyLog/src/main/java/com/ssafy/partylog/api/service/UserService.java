package com.ssafy.partylog.api.service;

import com.ssafy.partylog.api.request.UserRequest;
import com.ssafy.partylog.api.response.UserResponse;

import java.util.HashMap;

public interface UserService {

    public UserResponse registUser(UserRequest userInfo) throws Exception;

    public String getKakaoAccessToken(String code) throws Exception;

    public HashMap<String, Object> getKakaoUserInfo(String kakao_Access_Token) throws Exception;
}
