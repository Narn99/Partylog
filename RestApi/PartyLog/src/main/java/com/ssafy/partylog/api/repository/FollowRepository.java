package com.ssafy.partylog.api.repository;

import com.ssafy.partylog.api.Entity.Follow;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FollowRepository extends JpaRepository<Follow, Long> {
    List<Follow> deleteFollowByFollowerNoAndFolloweeNo(int followerNo, int followeeNo);
    
    // 내가 팔로우한 사람 목록
    List<Integer> findByFollowerNo(int followerNo);
    
    // 나를 팔로우한 사람 목록
    List<Integer> findByFolloweeNo(int followeeNo);
        
}
