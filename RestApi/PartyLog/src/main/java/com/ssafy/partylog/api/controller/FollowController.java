package com.ssafy.partylog.api.controller;

import com.ssafy.partylog.api.response.FollowResponseBody;
import com.ssafy.partylog.api.response.commonResponse;
import com.ssafy.partylog.api.service.FollowService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    public ResponseEntity<commonResponse> addFollow(@PathVariable int followeeNo, Authentication authentication) throws Exception {
        // 토큰 받기
        int followNo = Integer.parseInt(authentication.getName());

        // 메시지
        String message = "";

        // 팔로우 등록
        int status = followService.addFollow(followNo, followeeNo);

        if(status == 1){
            message = "팔로우 성공";
            commonResponse reply= commonResponse.createResponseWithNoContent("201", message);
            return new ResponseEntity<commonResponse>(reply, HttpStatus.CREATED);
        }else {
            message = "팔로우 실패";
            commonResponse reply = commonResponse.createResponseWithNoContent("400", message);
            return new ResponseEntity<commonResponse>(reply, HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/removeFollow/{followeeNo}")
    @Operation(summary = "팔로우 해제", description = "팔로우를 해제합니다.")
    @Parameter(name = "followeeNo", description = "내가 팔로우 해제할 회원 번호")
    public ResponseEntity<commonResponse> removeFollow(@PathVariable int followeeNo, Authentication authentication) throws Exception {
        //토큰 받기
        int followNo = Integer.parseInt(authentication.getName());
        // 메시지 저장
        String message = "";
        
        //팔로우 해제
        int status = followService.removeFollow(followNo, followeeNo);

        if(status == 1){
            message = "팔로우 해제 성공";
            commonResponse reply = commonResponse.createResponseWithNoContent("200",message);
            return new ResponseEntity<commonResponse>(reply, HttpStatus.OK);
        }else {
            message = "팔로우 해제 실패";
            commonResponse reply = commonResponse.createResponseWithNoContent("400",message);
            return new ResponseEntity<commonResponse>(reply, HttpStatus.BAD_REQUEST);
        }
    }

    //나를 팔로우 하는 사람 목록 가져오기
    @GetMapping("/searchFollowerList/{limit}/{offset}")
    @Operation(summary = "팔로워리스트", description = "나를 팔로우한 사람 목록")
    @Parameter(name = "limit", description = "한번에 가지고 올 사람 수")
    @Parameter(name = "offset", description = "가지고 올 때 시작하는 순번 (0부터 시작, limit 크기만큼 커짐)")
    public ResponseEntity<commonResponse<List<FollowResponseBody>>> searchFollowerList(@PathVariable int limit, @PathVariable int offset, Authentication authentication) throws Exception{
        //토큰 받기
        int followNo = Integer.parseInt(authentication.getName());

        List<FollowResponseBody> list = followService.searchFollowerList(followNo, limit, offset);

        commonResponse data = commonResponse.createResponse("200",list, "호출 성공");

        return new ResponseEntity<commonResponse<List<FollowResponseBody>>>(data, HttpStatus.OK);
    }

    //내가 팔로우 하는 사람 목록 가져오기
    @GetMapping("/searchFolloweeList/{limit}/{offset}")
    @Operation(summary = "팔로이리스트", description = "내가 팔로우한 사람 목록")
    @Parameter(name = "limit", description = "한번에 가지고 올 사람 수")
    @Parameter(name = "offset", description = "가지고 올 때 시작하는 순번 (0부터 시작, limit 크기만큼 커짐)")
    public ResponseEntity<commonResponse<List<FollowResponseBody>>> searchFolloweeList(@PathVariable int limit, @PathVariable int offset, Authentication authentication) throws Exception{
        //토큰 받기
        int followNo = Integer.parseInt(authentication.getName());

        List<FollowResponseBody> list = followService.searchFolloweeList(followNo, limit, offset);

        commonResponse data = commonResponse.createResponse("200",list,"호출 성공");

        return new ResponseEntity<commonResponse<List<FollowResponseBody>>>(data, HttpStatus.OK);
    }

    //나를 팔로우하는 사람 수
    @GetMapping("/getFollowerNumber")
    @Operation(summary = "팔로워들", description = "나를 팔로우하는 사람 수")
    public ResponseEntity<commonResponse<Long>> getFollowerNumber(Authentication authentication) throws Exception{
        //토큰 받기
        int userNo = Integer.parseInt(authentication.getName());

        long counted = followService.getFollowerNumber(userNo);

        commonResponse data = commonResponse.createResponse("200",counted, "호출 성공");

        return new ResponseEntity<commonResponse<Long>> (data, HttpStatus.OK);
    }

    //내가 팔로우하는 사람 수
    @GetMapping("/getFolloweeNumber")
    @Operation(summary = "스타들", description = "내가 팔로우하는 사람 수")
    public ResponseEntity<commonResponse<Long>> getFolloweeNumber(Authentication authentication) throws Exception{
        //토큰 받기
        int userNo = Integer.parseInt(authentication.getName());

        long counted = followService.getFolloweeNumber(userNo);

        commonResponse data = commonResponse.createResponse("200", counted, "호출 성공");

        return new ResponseEntity<commonResponse<Long>>(data, HttpStatus.OK);
    }
}
