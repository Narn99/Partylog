package com.ssafy.partylog.api.controller;

import com.ssafy.partylog.api.response.FollowResponse;
import com.ssafy.partylog.api.service.FollowService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
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

    private FollowController(FollowService followService) {
        this.followService = followService;
    }

    @PostMapping("/addFollow/{followeeNo}")
    @Operation(summary = "팔로우하기", description = "팔로우를 합니다.")
    @Parameter(name = "followeeNo", description = "내가 팔로우할 회원 번호")
    public ResponseEntity<HashMap<String, Object>> addFollow(@PathVariable int followeeNo, Authentication authentication) throws Exception {
        HashMap<String, Object> resultMap = new HashMap<>();
        // 토큰 받기
        int followNo = Integer.parseInt(authentication.getName());
        // 메시지 저장
        String message = "팔로우 하셨습니다.";
        resultMap.put("message", message);
        // 팔로우 등록
        followService.addFollow(followNo, followeeNo);

        return new ResponseEntity<HashMap<String, Object>>(resultMap, HttpStatus.OK);
    }

    @DeleteMapping("/removeFollow/{followeeNo}")
    @Operation(summary = "팔로우 해제", description = "팔로우를 해제합니다.")
    @Parameter(name = "followeeNo", description = "내가 팔로우 해제할 회원 번호")
    public ResponseEntity<HashMap<String, Object>> removeFollow(@PathVariable int followeeNo, Authentication authentication) throws Exception {
        HashMap<String, Object> resultMap = new HashMap<>();
        //토큰 받기
        int followNo = Integer.parseInt(authentication.getName());
        // 메시지 저장
        String message = "팔로우 해제하셨습니다.";
        resultMap.put("message", message);
        
        //팔로우 해제
        followService.removeFollow(followNo, followeeNo);

        return new ResponseEntity<HashMap<String, Object>>(resultMap, HttpStatus.OK);
    }

    //나를 팔로우 하는 사람 목록 가져오기
    @GetMapping("/searchFollowerList/{limit}/{offset}")
    @Operation(summary = "팔로워리스트", description = "나를 팔로우한 사람 목록")
    @Parameter(name = "limit", description = "한번에 가지고 올 사람 수")
    @Parameter(name = "offset", description = "가지고 올 때 시작하는 순번 (0부터 시작, limit 크기만큼 커짐)")
    public ResponseEntity<List<FollowResponse>> searchFollowerList(@PathVariable int limit, @PathVariable int offset, Authentication authentication) throws Exception{
        //토큰 받기
        int followNo = Integer.parseInt(authentication.getName());

        List<FollowResponse> list = followService.searchFollowerList(followNo, limit, offset);

        return new ResponseEntity<List<FollowResponse>>(list, HttpStatus.OK);
    }

    //내가 팔로우 하는 사람 목록 가져오기
    @GetMapping("/searchFolloweeList/{limit}/{offset}")
    @Operation(summary = "팔로이리스트", description = "내가 팔로우한 사람 목록")
    @Parameter(name = "limit", description = "한번에 가지고 올 사람 수")
    @Parameter(name = "offset", description = "가지고 올 때 시작하는 순번 (0부터 시작, limit 크기만큼 커짐)")
    public ResponseEntity<List<FollowResponse>> searchFolloweeList(@PathVariable int limit, @PathVariable int offset, Authentication authentication) throws Exception{
        //토큰 받기
        int followNo = Integer.parseInt(authentication.getName());
        List<FollowResponse> list = followService.searchFolloweeList(followNo, limit, offset);

        return new ResponseEntity<List<FollowResponse>>(list, HttpStatus.OK);
    }
}
