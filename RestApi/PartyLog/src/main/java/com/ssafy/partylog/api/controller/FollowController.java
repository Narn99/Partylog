package com.ssafy.partylog.api.controller;

import com.ssafy.partylog.api.request.UserRequest;
import com.ssafy.partylog.api.service.FollowService;
import com.ssafy.partylog.api.service.UserService;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@RequestMapping("/user")
public class FollowController {
//    private UserService userService;

    private FollowService followService;

//    private FollowController(UserService userService) {
//        this.userService = userService;
//    }

//    private FollowController(){}
    private FollowController(FollowService followService) {
        this.followService = followService;
    }

    @PostMapping("/addFollow/{followeeNo}")
    public ResponseEntity<HashMap<String, Object>> addFollow(@PathVariable int followeeNo) throws Exception {
        HashMap<String, Object> resultMap = new HashMap<>();
        // 메시지 저장
        String message = "팔로우 하셨습니다.";
        resultMap.put("msg", message);
        System.out.println(followeeNo);
        // 팔로우 등록
        followService.addFollow(followeeNo);

        return new ResponseEntity<HashMap<String, Object>>(resultMap, HttpStatus.OK);
    }

    @DeleteMapping("/removeFollow/{followeeNo}")
    public ResponseEntity<HashMap<String, Object>> removeFollow(@PathVariable int followeeNo) throws Exception {
        HashMap<String, Object> resultMap = new HashMap<>();
        // 메시지 저장
        String message = "팔로우 해제하셨습니다.";
        resultMap.put("msg", message);
        
        //팔로우 해제
        followService.removeFollow(followeeNo);

        return new ResponseEntity<HashMap<String, Object>>(resultMap, HttpStatus.OK);
    }
}
