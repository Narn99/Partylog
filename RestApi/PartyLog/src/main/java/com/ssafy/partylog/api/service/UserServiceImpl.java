package com.ssafy.partylog.api.service;

import com.ssafy.partylog.api.domain.UserEntity;
import com.ssafy.partylog.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl {

    private final UserRepository userRepository;

    public void addUser(UserEntity userEntity){
        userRepository.save(userEntity);
    }
}
