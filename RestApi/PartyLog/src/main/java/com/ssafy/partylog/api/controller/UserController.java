package com.ssafy.partylog.api.controller;

import com.ssafy.partylog.api.Entity.UserEntity;
import com.ssafy.partylog.api.request.UserRequest;
import com.ssafy.partylog.api.response.UserResponse;
import com.ssafy.partylog.api.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;


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
//    @ApiResponses(value = {
//            @ApiResponse(responseCode = "200", description = "Success", content = @Content(array = @ArraySchema(schema = @Schema(implementation = HashMap.class)))),
//            @ApiResponse(responseCode = "400", description = "Invalid"),
//            @ApiResponse(responseCode = "404", description = "Not found")
//    })
    public ResponseEntity<UserResponse> login(@RequestParam("code") String code) throws Exception {
        log.info("카카오 인증 코드: {}", code);
        String accessToken = null;
        String refreshToken = null;

        // 카카오 로그인 과정을 통해 생일을 제외한 유저정보  DB에 저장
        UserEntity user = userService.searchKakaoAccessToken(code);
        log.info("사용자 정보: {}", user);
        if(user.getUserBirthday() != null) {
            accessToken = userService.createToken(user.getUserNo(), "access-token");
            refreshToken = userService.createToken(user.getUserNo(), "refresh-token");
            userService.saveRefreshToken(user.getUserNo(), refreshToken);
            log.info("엑세스 토큰: {}", accessToken);
            log.info("리프레시 토큰: {}", refreshToken);
        }

        UserResponse response = UserResponse.builder()
                .userNo(user.getUserNo())
                .userBirthday(user.getUserBirthday())
                .userNickname(user.getUserNickname())
                .userProfile(user.getUserProfile())
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/join")
    @Operation(summary = "회원가입", description = "회원가입을 진행합니다.")
    @Parameter(name = "userInfo", description = "회원가입 시 받는 회원정보")
//    @ApiResponses(value = {
//            @ApiResponse(responseCode = "200", description = "Success", content = @Content(array = @ArraySchema(schema = @Schema(implementation = UserResponse.class)))),
//            @ApiResponse(responseCode = "400", description = "Invalid"),
//            @ApiResponse(responseCode = "404", description = "Not found")
//    })
    public ResponseEntity<UserResponse> join(@RequestBody UserRequest userRequest) throws Exception {
        log.info("회원가입 요청값: {}", userRequest);
        UserEntity user = null;
        String accessToken = null;
        String refreshToken = null;
        if(userService.join(userRequest)) {
            // 회원가입 성공 시 토큰 발행
            accessToken = userService.createToken(userRequest.getUserNo(), "access-token");
            refreshToken = userService.createToken(userRequest.getUserNo(), "refresh-token");
            userService.saveRefreshToken(userRequest.getUserNo(), refreshToken);
            // 회원 정보 검색
            user = userService.searchUserInfoByUserNo(userRequest.getUserNo());
        }

        UserResponse response = UserResponse.builder()
                .userNo(user.getUserNo())
                .userBirthday(user.getUserBirthday())
                .userNickname(user.getUserNickname())
                .userProfile(user.getUserProfile())
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/mypage")
    public ResponseEntity<String> searchUserInfo(Authentication authentication) throws Exception {
        return new ResponseEntity<>("사용자 번호: " + authentication.getName(), HttpStatus.OK);
    }

    @PostMapping("/logout")
    public ResponseEntity logout(Authentication authentication) throws Exception {
        // DB에 저장된 refreshToken 값 제거
        log.info("사용자 번호: {}", authentication.getName());
        userService.logout(Integer.parseInt(authentication.getName()));
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
