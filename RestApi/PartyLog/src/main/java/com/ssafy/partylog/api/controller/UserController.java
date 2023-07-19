package com.ssafy.partylog.api.controller;

import com.ssafy.partylog.api.table.User;
import com.ssafy.partylog.api.model.UserDto;
import com.ssafy.partylog.api.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@RequestMapping("/user")
public class UserController {
    private UserService userService;

    private UserController(UserService kakaoLoginService) {
        this.userService = kakaoLoginService;
    }

    @PostMapping("/regist")
    public ResponseEntity<HashMap<String, Object>> registUser(@RequestBody UserDto userInfo) throws Exception {
        HashMap<String, Object> resultMap = new HashMap<>();
        System.out.println("회원가입: " + userInfo);
        User result = userService.registUser(userInfo);
        System.out.println(result);
        return new ResponseEntity<HashMap<String, Object>>(resultMap, HttpStatus.OK);
    }

    @GetMapping("/login")
    public ResponseEntity<HashMap<String, Object>> loginUser(@RequestParam("code") String code) throws Exception {
        String access_Token = userService.getAccessToken(code);
        HashMap<String, Object> userInfo = userService.getUserInfo(access_Token);
        return new ResponseEntity<HashMap<String, Object>>(userInfo, HttpStatus.OK);
    }
}
