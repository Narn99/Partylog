package com.ssafy.partylog.api.controller;

import com.ssafy.partylog.api.response.FollowResponse;
import com.ssafy.partylog.api.response.StateResponse;
import com.ssafy.partylog.api.service.FollowService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;


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
    public ResponseEntity<StateResponse> addFollow(@PathVariable int followeeNo, Authentication authentication) throws Exception {
        // 토큰 받기
        int followNo = Integer.parseInt(authentication.getName());

        // 메시지
        String message = "";

        // 팔로우 등록
        int status = followService.addFollow(followNo, followeeNo);

        if(status == 1){
            message = "팔로우 성공";
            StateResponse reply= new StateResponse("201", message);
            return new ResponseEntity<StateResponse>(reply, HttpStatus.CREATED);
        }else {
            message = "팔로우 실패";
            StateResponse reply = new StateResponse("400",message);
            return new ResponseEntity<StateResponse>(reply, HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/removeFollow/{followeeNo}")
    @Operation(summary = "팔로우 해제", description = "팔로우를 해제합니다.")
    @Parameter(name = "followeeNo", description = "내가 팔로우 해제할 회원 번호")
    public ResponseEntity<StateResponse> removeFollow(@PathVariable int followeeNo, Authentication authentication) throws Exception {
        //토큰 받기
        int followNo = Integer.parseInt(authentication.getName());
        // 메시지 저장
        String message = "";
        
        //팔로우 해제
        int status = followService.removeFollow(followNo, followeeNo);

        if(status == 1){
            message = "팔로우 해제 성공";
            StateResponse reply = new StateResponse("200", message);
            return new ResponseEntity<StateResponse>(reply, HttpStatus.OK);
        }else {
            message = "팔로우 해제 실패";
            StateResponse reply = new StateResponse("400",message);
            return new ResponseEntity<StateResponse>(reply, HttpStatus.BAD_REQUEST);
        }
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
