package com.ssafy.partylog.api.controller;

import com.ssafy.partylog.api.response.FollowResponse;
import com.ssafy.partylog.api.service.FollowService;
import com.ssafy.partylog.token.JwtTokenProvider;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.ServletRequest;
import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/user")
@Tag(name = "FollowController", description = "팔로우 관련 API")
public class FollowController {

    private FollowService followService;

    private JwtTokenProvider jwtTokenProvider;

    private FollowController(FollowService followService) {
        this.followService = followService;
    }

    @PostMapping("/addFollow/{followeeNo}")
    @Operation(summary = "팔로우하기", description = "팔로우를 합니다.")
    public ResponseEntity<HashMap<String, Object>> addFollow(@PathVariable int followeeNo, ServletRequest request) throws Exception {
        HashMap<String, Object> resultMap = new HashMap<>();
        // 토큰 받기
//        String token = jwtTokenProvider.resolveToken((HttpServletRequest) request);

//        System.out.println(jwtTokenProvider.getUserPk(token));

        // 메시지 저장
        String message = "팔로우 하셨습니다.";
        resultMap.put("msg", message);
        // 팔로우 등록
        followService.addFollow(followeeNo);

        return new ResponseEntity<HashMap<String, Object>>(resultMap, HttpStatus.OK);
    }

    @DeleteMapping("/removeFollow/{followeeNo}")
    @Operation(summary = "팔로우 해제", description = "팔로우를 해제합니다.")
    public ResponseEntity<HashMap<String, Object>> removeFollow(@PathVariable int followeeNo) throws Exception {
        HashMap<String, Object> resultMap = new HashMap<>();
        // 메시지 저장
        String message = "팔로우 해제하셨습니다.";
        resultMap.put("msg", message);
        
        //팔로우 해제
        followService.removeFollow(followeeNo);

        return new ResponseEntity<HashMap<String, Object>>(resultMap, HttpStatus.OK);
    }

    //나를 팔로우 하는 사람 목록 가져오기
    @GetMapping("/searchFollowerList/{limit}/{offset}")
    @Operation(summary = "팔로워리스트", description = "나를 팔로우한 사람 목록")
    public ResponseEntity<List<FollowResponse>> searchFollowerList(@PathVariable int limit, @PathVariable int offset) throws Exception{
        List<FollowResponse> list = followService.searchFollowerList(limit, offset);

        return new ResponseEntity<List<FollowResponse>>(list, HttpStatus.OK);
    }

    //내가 팔로우 하는 사람 목록 가져오기
    @GetMapping("/searchFolloweeList/{limit}/{offset}")
    @Operation(summary = "팔로이리스트", description = "내가 팔로우한 사람 목록")
    public ResponseEntity<List<FollowResponse>> searchFolloweeList(@PathVariable int limit, @PathVariable int offset) throws Exception{
        List<FollowResponse> list = followService.searchFolloweeList(limit, offset);

        return new ResponseEntity<List<FollowResponse>>(list, HttpStatus.OK);
    }
}
