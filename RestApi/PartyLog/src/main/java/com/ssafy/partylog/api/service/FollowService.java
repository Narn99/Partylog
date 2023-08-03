package com.ssafy.partylog.api.service;

import com.ssafy.partylog.api.Entity.UserEntity;
import com.ssafy.partylog.api.response.FollowResponse;

import java.util.List;

public interface FollowService {

    int addFollow(int followNo, int followeeId) throws Exception;

    int removeFollow(int followNo, int followeeId) throws Exception;

    List<FollowResponse> searchFollowerList(int followNo, int limit, int offset) throws Exception;

    List<FollowResponse> searchFolloweeList(int followNo, int limit, int offset) throws Exception;

}
