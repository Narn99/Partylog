package com.ssafy.partylog.api.service;

import java.util.HashMap;

public interface KakaoLoginService {

    public String getAccessToken(String code) throws Exception;

    public HashMap<String, Object> getUserInfo(String access_Token) throws Exception;
}
