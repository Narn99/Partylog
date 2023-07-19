package com.ssafy.partylog.api.service;

import com.ssafy.partylog.api.table.User;
import com.ssafy.partylog.api.model.UserDto;

import java.util.HashMap;

public interface UserService {

    public User registUser(UserDto userInfo) throws Exception;

    public String getAccessToken(String code) throws Exception;

    public HashMap<String, Object> getUserInfo(String access_Token) throws Exception;
}
