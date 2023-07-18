package com.ssafy.partylog.api.repository;

import com.ssafy.partylog.api.domain.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@EnableTransactionManagement
@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {

}
