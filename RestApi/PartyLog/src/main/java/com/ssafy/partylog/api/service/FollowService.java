package com.ssafy.partylog.api.service;

import com.ssafy.partylog.api.Entity.UserEntity;
import com.ssafy.partylog.api.response.FollowResponse;

import java.util.List;

public interface FollowService {

    public void addFollow(int followNo, int followeeId) throws Exception;

    public void removeFollow(int followNo, int followeeId) throws Exception;

    public List<FollowResponse> searchFollowerList(int followNo, int limit, int offset) throws Exception;

    public List<FollowResponse> searchFolloweeList(int followNo, int limit, int offset) throws Exception;

}
