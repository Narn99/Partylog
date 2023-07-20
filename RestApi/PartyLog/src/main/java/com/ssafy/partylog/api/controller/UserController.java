package com.ssafy.partylog.api.controller;

import com.ssafy.partylog.api.request.UserRequest;
import com.ssafy.partylog.api.response.UserResponse;
import com.ssafy.partylog.api.service.UserService;
import io.swagger.v3.oas.annotations.Hidden;
import io.swagger.v3.oas.annotations.tags.Tag;
import com.ssafy.partylog.token.JwtTokenProvider;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;


@RestController
@RequestMapping("/user")
@Tag(name = "User", description = "Swagger 테스트용 API - User")
public class UserController {

    private UserService userService;
    private final JwtTokenProvider jwtTokenProvider;

    public UserController(UserService userService, JwtTokenProvider jwtTokenProvider) {
        this.userService = userService;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @PostMapping("/regist")
    @Hidden
    public ResponseEntity<HashMap<String, Object>> registUser(@RequestBody UserRequest userInfo) throws Exception {
        HashMap<String, Object> resultMap = new HashMap<>();
        String message = "";
        UserResponse userResponse = userService.registUser(userInfo);
        System.out.println(userResponse);
        if(userResponse != null) {
            message = "회원가입 성공";
        } else {
            message = "회원가입 실패";
        }
        resultMap.put("msg", message);
        return new ResponseEntity<HashMap<String, Object>>(resultMap, HttpStatus.OK);
    }

    @GetMapping("/login")
    @Hidden
    public ResponseEntity<HashMap<String, Object>> loginUser(@RequestParam("code") String code) throws Exception {
        HashMap<String, Object> resultMap = new HashMap<>();
        // 카카오 토큰 발급
        String kakao_Access_Token = userService.getKakaoAccessToken(code);
        HashMap<String, Object> userInfo = userService.getKakaoUserInfo(kakao_Access_Token);
        String kakao_auth_id = userInfo.get("id").toString();
        if(kakao_auth_id != null || !kakao_auth_id.equals("")) {
            resultMap.put("access_token", jwtTokenProvider.createToken(kakao_auth_id, "user"));
            resultMap.put("isSuccess", true);
        } else {
            System.out.println("카카오 회원 아님");
        }
        // 자체 서비스 토큰 발급

        return new ResponseEntity<HashMap<String, Object>>(resultMap, HttpStatus.OK);
    }
}
