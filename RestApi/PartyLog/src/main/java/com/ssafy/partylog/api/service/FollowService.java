package com.ssafy.partylog.api.service;

import com.ssafy.partylog.api.Entity.UserEntity;

import java.util.List;

public interface FollowService {

    public void addFollow(int followeeId) throws Exception;

    public void removeFollow(int followeeId) throws Exception;

    public List<UserEntity> getFollowerLIst() throws Exception;

    public List<UserEntity> getFolloweeLIst() throws Exception;

}
