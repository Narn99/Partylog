package com.ssafy.partylog.api.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.partylog.api.domain.UserEntity;
import com.ssafy.partylog.api.model.KakaoProfile;
import com.ssafy.partylog.api.model.OAuthToken;
import com.ssafy.partylog.api.repository.UserRepository;
import com.ssafy.partylog.api.service.UserService;
import com.ssafy.partylog.api.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.sql.Date;

@RestController
@RequestMapping("/test")
public class  TestController {

    private UserServiceImpl us;

    public TestController(UserServiceImpl us) {
        this.us = us;
    }

    @GetMapping("/hello")
    public String test() {
        return "Hello";
    }

    @PostMapping("/oauth/token")
    public ResponseEntity<String> getKakaoToken(@RequestParam("grant_type") String grant_type, @RequestParam("grant_type") String client_id, @RequestParam("grant_type") String redirect_uri, @RequestParam("grant_type") String code) {

        String result = "완료";
        return new ResponseEntity<String>(result, HttpStatus.OK);
    }


    @GetMapping("/auth/kakao")
    public String kakaoCallback(@RequestParam String code) {
//        return "카카오 인증코드 응답"+code;
        //RestTemplate : http요청을 편리하게 해줌
        RestTemplate rt = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type","application/x-www-form-urlencoded;charset=utf-8");

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", "69deca5e46403a1f3c26cc03c04334c4");
        params.add("redirect_uri", "http://localhost:9999/partylog/test/auth/kakao");
        params.add("code", code);

        HttpEntity<MultiValueMap<String,String>> kakaoTokenRequest =
                new HttpEntity<>(params, headers);

        //토큰요청
        ResponseEntity response = rt.exchange(
                "https://kauth.kakao.com/oauth/token",
                HttpMethod.POST,
                kakaoTokenRequest,
                String.class
        );

//        return "카카오 토큰요청 응답"+response.getBody();

        //ObjectMapper : JSON파일을 Object로 변환
        ObjectMapper objMapper = new ObjectMapper();
        OAuthToken oauthToken = null;

        try {
            oauthToken = objMapper.readValue((String) response.getBody(), OAuthToken.class);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        System.out.println("토큰" + oauthToken.getAccess_token());

        //사용자 정보 가져오기
        RestTemplate rt2 = new RestTemplate();
        HttpHeaders headers2 = new HttpHeaders();
        headers2.add("Authorization", "Bearer "+oauthToken.getAccess_token());
        headers2.add("Content-type","application/x-www-form-urlencoded;charset=utf-8");

        HttpEntity<MultiValueMap<String,String>> kakaoProfileRequest =
                new HttpEntity<>(headers2);

        ResponseEntity<String> response2 = rt2.exchange(
                "https://kapi.kakao.com/v2/user/me",
                HttpMethod.POST,
                kakaoProfileRequest,
                String.class
        );

//        return "카카오 사용자정보"+response2.getBody();

        //ObjectMapper : JSON파일을 Object로 변환
        ObjectMapper objMapper2 = new ObjectMapper();
        KakaoProfile kakaoProfile = null;

        try {
            kakaoProfile = objMapper2.readValue(response2.getBody(), KakaoProfile.class);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        // 정보를 DB애 저장하기 위해 먼저 틀을 만든다.
        UserEntity user  = new UserEntity();
        user.setUserNickname(kakaoProfile.getProperties().getNickname());
        user.setUserId(kakaoProfile.getId());
        user.setUserProfile(kakaoProfile.getProperties().getProfile_image());
        String[] s = kakaoProfile.getKakao_account().getBirthday().split("");
        String day = "1995-" + s[0]+s[1]+"-"+s[2]+s[3];
        user.setUserBirthday(Date.valueOf(day));

        // 정보를 DB에 저장
        us.addUser(user);


        return "카카오 사용자정보"+response2.getBody();
    }

}
