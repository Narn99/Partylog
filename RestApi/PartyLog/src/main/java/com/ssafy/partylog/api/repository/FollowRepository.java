package com.ssafy.partylog.api.repository;

import com.ssafy.partylog.api.Entity.Follow;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FollowRepository extends JpaRepository<Follow, Long> {
    List<Follow> deleteFollowByFollowerNoAndFolloweeNo(int followerNo, int followeeNo);

}
