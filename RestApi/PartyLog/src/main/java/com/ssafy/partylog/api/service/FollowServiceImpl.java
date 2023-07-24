package com.ssafy.partylog.api.service;

import com.ssafy.partylog.api.Entity.FollowEntity;
import com.ssafy.partylog.api.repository.FollowRepository;
import com.ssafy.partylog.api.response.FollowResponse;
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

        FollowEntity followEntity = new FollowEntity(followerNo, followeeNo);
        followRepository.save(followEntity);
    }

    @Transactional
    @Override
    public void removeFollow(int followeeNo) throws Exception {
        // JWT 토큰 디코딩으로 사용자 id 알아내기
        int followerNo = 1;

        FollowEntity followEntity = new FollowEntity(followerNo, followeeNo);
//        System.out.println(followRepository.deleteFollowByFollowerNoAndFolloweeNo(followerNo, followeeNo));
        followRepository.deleteFollowByFollowerNoAndFolloweeNo(followerNo, followeeNo);
    }

    //나를 팔로우한 사람 목록 가져오기
    public List<FollowResponse> searchFollowerList(int limit, int offset) throws Exception {
        // JWT 토큰 디코딩으로 사용자 id 알아내기
        int followerNo = 1;
//        System.out.println(followRepository.getFolloweeList(followerNo, limit, offset));
        List<FollowResponse> list = followRepository.getFolloweeList(followerNo, limit, offset);
        return list;
    }

    @Override
    //내가 팔로우한 사람 목록 가져오기
    public List<FollowResponse> searchFolloweeList(int limit, int offset) throws Exception {
        // JWT 토큰 디코딩으로 사용자 id 알아내기
        int followeeNo = 1;
//        System.out.println(followRepository.getFolloweeList(followeeNo, limit, offset));
        List<FollowResponse> list = followRepository.getFollowerList(followeeNo, limit, offset);
        return list;
    }

}
