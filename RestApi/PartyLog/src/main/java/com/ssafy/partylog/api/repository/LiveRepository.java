package com.ssafy.partylog.api.repository;

import com.ssafy.partylog.api.Entity.LiveEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LiveRepository extends JpaRepository<LiveEntity, Long> {
}
