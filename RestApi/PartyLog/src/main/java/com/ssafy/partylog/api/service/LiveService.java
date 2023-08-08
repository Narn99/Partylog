package com.ssafy.partylog.api.service;

import com.ssafy.partylog.api.request.LiveRequest;

import java.util.Map;

public interface LiveService {

    void createLive(Map<String, Object> params) throws Exception;

    void endLive(LiveRequest request) throws Exception;
}
