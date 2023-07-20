package com.ssafy.partylog.api.controller;

import com.ssafy.partylog.api.request.UserRequest;
import com.ssafy.partylog.api.response.UserResponse;
import com.ssafy.partylog.api.service.UserService;
import io.swagger.v3.oas.annotations.Hidden;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;


@RestController
@RequestMapping("/user")
@Tag(name = "User", description = "Swagger 테스트용 API - User")
public class UserController {
    private UserService userService;

    private UserController(UserService kakaoLoginService) {
        this.userService = kakaoLoginService;
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
        String access_Token = userService.getAccessToken(code);
        HashMap<String, Object> userInfo = userService.getUserInfo(access_Token);
        return new ResponseEntity<HashMap<String, Object>>(userInfo, HttpStatus.OK);
    }
}
