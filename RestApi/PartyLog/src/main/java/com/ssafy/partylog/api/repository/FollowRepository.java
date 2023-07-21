package com.ssafy.partylog.api.repository;

import com.ssafy.partylog.api.Entity.FollowEntity;
import com.ssafy.partylog.api.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface FollowRepository extends JpaRepository<FollowEntity, Long> {
    List<FollowEntity> deleteFollowByFollowerNoAndFolloweeNo(int followerNo, int followeeNo);
    
    // 내가 팔로우한 사람 목록
    @Query(value = "SELECT *  FROM USER WHERE user_no IN (SELECT followee_no FROM FOLLOW WHERE follower_no = ?1) ORDER BY user_nickname ASC LIMIT ?2 OFFSET ?3", nativeQuery = true)
    List<User> findByFollowerNo(int follower_no, int limit, int offset);
    
    // 나를 팔로우한 사람 목록
    @Query(value = "SELECT *  FROM USER WHERE user_no IN (SELECT follower_no FROM FOLLOW WHERE followee_no = ?1) ORDER BY user_nickname ASC LIMIT ?2 OFFSET ?3", nativeQuery = true)
    List<User> findByFolloweeNo(int followee_no, int limit, int offset);
        
}
