package com.ssafy.partylog.api.service;


import com.ssafy.partylog.api.Entity.Follow;
import com.ssafy.partylog.api.Entity.User;
import com.ssafy.partylog.api.repository.FollowRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class FollowServiceImpl implements FollowService {
    private FollowRepository followRepository;

    public FollowServiceImpl(FollowRepository followRepository){ this.followRepository = followRepository;}


    @Override
    public void addFollow(int followeeNo) throws Exception {
        // JWT 토큰 디코딩으로 사용자 id 알아내기
        int followerNo = 1;

        Follow follow = new Follow(followerNo, followeeNo);
        followRepository.save(follow);
    }

    @Transactional
    @Override
    public void removeFollow(int followeeNo) throws Exception {
        // JWT 토큰 디코딩으로 사용자 id 알아내기
        int followerNo = 1;

        Follow follow = new Follow(followerNo, followeeNo);
        followRepository.deleteFollowByFollowerNoAndFolloweeNo(followerNo, followeeNo);
    }

    @Override
    public List<User> searchFollowerList() throws Exception {
        return null;
    }

    @Override
    public List<User> searchFolloweeList() throws Exception {
        return null;
    }

}
