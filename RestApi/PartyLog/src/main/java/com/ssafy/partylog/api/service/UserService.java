package com.ssafy.partylog.api.service;

import com.ssafy.partylog.api.Entity.User;
import com.ssafy.partylog.api.request.UserRequest;
import com.ssafy.partylog.api.response.UserResponse;

import java.util.HashMap;

public interface UserService {

    public UserResponse registUser(UserRequest userInfo) throws Exception;

    public String getAccessToken(String code) throws Exception;

    public HashMap<String, Object> getUserInfo(String access_Token) throws Exception;
}
