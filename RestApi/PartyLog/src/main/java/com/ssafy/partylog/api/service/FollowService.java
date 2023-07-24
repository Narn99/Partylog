package com.ssafy.partylog.api.service;

import com.ssafy.partylog.api.Entity.UserEntity;
import com.ssafy.partylog.api.response.FollowResponse;

import java.util.List;

public interface FollowService {

    public void addFollow(int followeeId) throws Exception;

    public void removeFollow(int followeeId) throws Exception;

    public List<FollowResponse> searchFollowerList(int limit, int offset) throws Exception;

    public List<FollowResponse> searchFolloweeList(int limit, int offset) throws Exception;

}
