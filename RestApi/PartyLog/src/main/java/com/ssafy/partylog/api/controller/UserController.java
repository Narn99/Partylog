package com.ssafy.partylog.api.controller;

import com.ssafy.partylog.api.Entity.UserEntity;
import com.ssafy.partylog.api.request.UserRequest;
import com.ssafy.partylog.api.response.UserSearchResponseBody;
import com.ssafy.partylog.api.response.commonResponse;
import com.ssafy.partylog.api.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Slf4j
@RestController
@RequestMapping("/user")
@Tag(name = "UserController", description = "사용자 관련 API")
public class UserController {

    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/login")
    @Operation(summary = "로그인", description = "로그인을 진행합니다.")
    @Parameter(name = "code", description = "카카오에서 발급해준 인증코드")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success", content = @Content(array = @ArraySchema(schema = @Schema(implementation = HashMap.class)))),
            @ApiResponse(responseCode = "201", description = "Need Birthday Info"),
            @ApiResponse(responseCode = "400", description = "Invalid"),
    })
    public ResponseEntity<commonResponse<Integer>> login(@RequestParam("code") String authCode, HttpServletResponse response) throws Exception {
        log.info("카카오 인증 코드: {}", authCode);
        
        String code = "";
        String message = "";
        String accessToken = null;
        String refreshToken = null;

        // 카카오 로그인 과정을 통해 생일을 제외한 유저정보  DB에 저장
        UserEntity user = userService.searchKakaoAccessToken(authCode);
        log.info("사용자 정보: {}", user);

        if(user.getUserBirthday() != null) {
            // 토큰 생성
            accessToken = userService.createToken(user.getUserNo(), "access-token");
            refreshToken = userService.createToken(user.getUserNo(), "refresh-token");
            userService.saveRefreshToken(user.getUserNo(), refreshToken);
            log.info("엑세스 토큰: {}", accessToken);
            code = "200";
            message = "로그인 성공";
        } else {
            code = "201";
            message = "생일 정보입력 요청";
        }

        commonResponse data = commonResponse.createResponse(code,user.getUserNo(),message);

        // response 값 저장
        response.setHeader("authorization", "Bearer " + accessToken);
        response.setHeader("refresh-token", "Bearer " + refreshToken);

        return new ResponseEntity<commonResponse<Integer>>(data, HttpStatus.OK);
    }

    @GetMapping("/mobile/login")
    @Operation(summary = "로그인", description = "로그인을 진행합니다.")
    @Parameter(name = "token", description = "카카오에서 발급해준 인증토큰")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success", content = @Content(array = @ArraySchema(schema = @Schema(implementation = HashMap.class)))),
            @ApiResponse(responseCode = "201", description = "Need Birthday Info"),
            @ApiResponse(responseCode = "400", description = "Invalid"),
    })
    public ResponseEntity<commonResponse<Integer>> mobileLogin(@RequestParam("token") String accessToken, HttpServletResponse response) throws Exception {
        HashMap<String,Object> resultMap = new HashMap<>();
        log.info("카카오 인증 토큰: {}", accessToken);

        String code = "";
        String message = "";
        String refreshToken = null;

        // 카카오 로그인 과정을 통해 생일을 제외한 유저정보  DB에 저장
        UserEntity user = userService.searchKakaoUserInfo(accessToken);
        log.info("사용자 정보: {}", user);

        if(user.getUserBirthday() != null) {
            // 토큰 생성
            accessToken = userService.createToken(user.getUserNo(), "access-token");
            refreshToken = userService.createToken(user.getUserNo(), "refresh-token");
            userService.saveRefreshToken(user.getUserNo(), refreshToken);
            log.info("엑세스 토큰: {}", accessToken);
            code = "200";
            message = "로그인 성공";
        } else {
            code = "201";
            message = "생일 정보입력 요청";
        }

        commonResponse data = commonResponse.createResponse(code,user.getUserNo(),message);

        // response 값 저장
        response.setHeader("authorization", "Bearer " + accessToken);
        response.setHeader("refresh-token", "Bearer " + refreshToken);

        return new ResponseEntity<commonResponse<Integer>>(data, HttpStatus.OK);
    }

    @PostMapping("/join")
    @Operation(summary = "회원가입", description = "회원가입을 진행합니다.")
    @Parameter(name = "userInfo", description = "회원가입 시 받는 회원정보")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success", content = @Content(array = @ArraySchema(schema = @Schema(implementation = HashMap.class)))),
            @ApiResponse(responseCode = "400", description = "Invalid"),
    })
    public ResponseEntity<commonResponse<Integer>> join(@RequestBody UserRequest userRequest, HttpServletResponse response) throws Exception {
        log.info("회원가입 요청값: {}", userRequest);
        String code = "";
        String message = "";
        commonResponse data;
        String accessToken = null;
        String refreshToken = null;
        if(userService.join(userRequest)) {
            // 회원가입 성공 시 토큰 발행
            accessToken = userService.createToken(userRequest.getUserNo(), "access-token");
            refreshToken = userService.createToken(userRequest.getUserNo(), "refresh-token");
            userService.saveRefreshToken(userRequest.getUserNo(), refreshToken);
            UserEntity user = userService.searchUserInfoByUserNo(userRequest.getUserNo());
            code = "200";
            message = "회원가입에 성공하였습니다.";

            data = commonResponse.createResponse(code,user.getUserNo(),message);
        } else {
            code = "400";
            message = "회원가입에 실패했습니다.";

            data = commonResponse.createResponse(code,0,message);
        }

        response.setHeader("authorization", "Bearer " + accessToken);
        response.setHeader("refresh-token", "Bearer " + refreshToken);
        return new ResponseEntity<commonResponse<Integer>>(data, HttpStatus.OK);
    }

    @GetMapping("/recreateAccessToken")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success", content = @Content(array = @ArraySchema(schema = @Schema(implementation = HashMap.class)))),
            @ApiResponse(responseCode = "400", description = "Invalid"),
    })
    public ResponseEntity<commonResponse> recreateAccessToken(HttpServletRequest request, HttpServletResponse response) throws Exception {
        String message = "";
        String refreshToken = request.getHeader("Authorization").split(" ")[1];
        String accessToken = userService.searchRefreshToken(refreshToken);

        response.setHeader("authorization", "Bearer " + accessToken);
        response.setHeader("refresh-token", "Bearer " + refreshToken);

        if(accessToken == null) { // refreshToken이 DB 값과 다른 경우
            message = "유효하지 않은 refreshToken 입니다.";
            commonResponse reply = commonResponse.createResponseWithNoContent("400",message);
            return new ResponseEntity<commonResponse>(reply, HttpStatus.BAD_REQUEST);
        } else {
            message = "accessToken 재발급 완료";
            commonResponse reply = commonResponse.createResponseWithNoContent("200",message);
            return new ResponseEntity<commonResponse>(reply, HttpStatus.OK);
        }
    }

    @PostMapping("/mypage")
    public ResponseEntity<String> searchUserInfo(Authentication authentication) throws Exception {
        System.out.println(authentication);
        return new ResponseEntity<>("사용자 번호: " + authentication.getName(), HttpStatus.OK);
    }

    @PostMapping("/logout")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success", content = @Content(array = @ArraySchema(schema = @Schema(implementation = HashMap.class)))),
            @ApiResponse(responseCode = "400", description = "Invalid"),
    })
    public ResponseEntity<commonResponse> logout(Authentication authentication) throws Exception {
        // DB에 저장된 refreshToken 값 제거

        String message = "";
        log.info("사용자 번호: {}", authentication.getName());
        if(userService.logout(Integer.parseInt(authentication.getName()))) { // 로그아웃 성공
            message = "로그아웃 성공";
            commonResponse reply = commonResponse.createResponseWithNoContent("200",message);
            return new ResponseEntity<commonResponse>(reply, HttpStatus.OK);
        } else { // 로그아웃 실패
            message = "로그아웃 실패";
            commonResponse reply = commonResponse.createResponseWithNoContent("400",message);
            return new ResponseEntity<commonResponse>(reply, HttpStatus.BAD_REQUEST);
        }
    }

    //나를 팔로우 하는 사람 목록 가져오기
    @GetMapping("/searchUser/{userNickname}/{limit}/{offset}")
    @Operation(summary = "유저 검색", description = "닉네임으로 유저를 검색합니다.")
    @Parameter(name = "userNickname", description = "검색 내용")
    @Parameter(name = "limit", description = "한번에 가지고 올 사람 수")
    @Parameter(name = "offset", description = "가지고 올 때 시작하는 순번 (0부터 시작, limit 크기만큼 커짐)")
    public ResponseEntity<commonResponse<List<UserSearchResponseBody>>> searchUser(@PathVariable String userNickname, @PathVariable int limit, @PathVariable int offset, Authentication authentication) throws Exception{
        //토큰 받기
        int myNo = Integer.parseInt(authentication.getName());

        List<UserSearchResponseBody> list = userService.searchUser(userNickname, myNo, limit, offset);

        commonResponse data = commonResponse.createResponse("200", list,"호출 성공");

        return new ResponseEntity<commonResponse<List<UserSearchResponseBody>>>(data, HttpStatus.OK);
    }
}
