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
    public int addFollow(int followNo, int followeeNo) throws Exception {
        FollowEntity followEntity = new FollowEntity(followNo, followeeNo);
        FollowEntity check = followRepository.save(followEntity);

        if(check == null) { // 저장된 값이 없다면
            return 0; //0을 반환한다.
        }else { // 저장된 값이 있다면
            return 1; // 1을 반환한다.
        }
    }

    @Transactional
    @Override
    public int removeFollow(int followNo, int followeeNo) throws Exception {

        FollowEntity followEntity = new FollowEntity(followNo, followeeNo);
//        System.out.println(followRepository.deleteFollowByFollowerNoAndFolloweeNo(followerNo, followeeNo));
        List<FollowEntity> list = followRepository.deleteFollowByFollowerNoAndFolloweeNo(followNo, followeeNo);

        if(list.size() == 0) { // 삭제된 값이 없다면
            return 0; //0을 반환한다.
        }else { // 삭제된 값이 있다면
            return 1; // 1을 반환한다.
        }
    }

    //나를 팔로우한 사람 목록 가져오기
    public List<FollowResponse> searchFollowerList(int followNo, int limit, int offset) throws Exception {

//        System.out.println(followRepository.getFolloweeList(followerNo, limit, offset));
        List<FollowResponse> list = followRepository.getFollowerList(followNo, limit, offset);
        return list;
    }

    @Override
    //내가 팔로우한 사람 목록 가져오기
    public List<FollowResponse> searchFolloweeList(int followNo, int limit, int offset) throws Exception {

//        System.out.println(followRepository.getFolloweeList(followeeNo, limit, offset));
        List<FollowResponse> list = followRepository.getFolloweeList(followNo, limit, offset);
        return list;
    }

}
