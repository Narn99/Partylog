package com.ssafy.partylog.api.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.partylog.api.service.KakaoLoginService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/kakao")
public class KakaoLoginController {
    private KakaoLoginService kakaoLoginService;

    public KakaoLoginController(KakaoLoginService kakaoLoginService) {
        this.kakaoLoginService = kakaoLoginService;
    }

    @GetMapping("/login")
    public ResponseEntity<HashMap<String, Object>> kakaoLogin(@RequestParam("code") String code) throws Exception {

        String access_Token = kakaoLoginService.getAccessToken(code);
        HashMap<String, Object> userInfo = kakaoLoginService.getUserInfo(access_Token);
        return new ResponseEntity<HashMap<String, Object>>(userInfo, HttpStatus.OK);
    }
}
