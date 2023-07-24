package com.ssafy.partylog.api.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.partylog.api.Entity.UserEntity;
import com.ssafy.partylog.api.repository.UserRepository;
import com.ssafy.partylog.api.request.UserRequest;
import com.ssafy.partylog.common.util.JwtUtil;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Value("${KAKAO_CLIENT_ID}")
    private String CLIENT_ID;
    @Value("${REDIRECT_URI}")
    private String REDIRECT_URI;
    @Value("${CLIENT_SECRET}")
    private String CLIENT_SECRET;
    @Value("${JWT_SECRETKEY}")
    private String JWT_SECRET_KEY;

    @Override
    @Transactional
    public String searchKakaoAccessToken(String code) throws Exception {
        String access_Token = "";
        String refresh_Token = "";
        String reqURL = "https://kauth.kakao.com/oauth/token";
        String result = "";
        String kakaoUserId = "";

        URL url = new URL(reqURL);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        // POST 요청을 위해 기본값이 false인 setDoOutput을 true로
        conn.setRequestMethod("POST");
        conn.setDoOutput(true);

        // POST 요청에 필요로 요구하는 파라미터 스트림을 통해 전송
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
        StringBuilder sb = new StringBuilder();
        sb.append("grant_type=authorization_code");
        sb.append("&client_id=" + CLIENT_ID); // REST_API키 본인이 발급받은 key 넣어주기
        sb.append("&redirect_uri=" + REDIRECT_URI); // REDIRECT_URI 본인이 설정한 주소 넣어주기
        sb.append("&client_secret=" + CLIENT_SECRET); // REDIRECT_URI 본인이 설정한 주소 넣어주기
        sb.append("&code=" + code);
        bw.write(sb.toString());
        bw.flush();

        // 요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
        BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        String line = "";
        while ((line = br.readLine()) != null) {
            result += line;
        }
//            System.out.println("response body : " + result);

        // jackson objectmapper 객체 생성
        ObjectMapper objectMapper = new ObjectMapper();
        // JSON String -> Map
        Map<String, Object> jsonMap = objectMapper.readValue(result, new TypeReference<Map<String, Object>>() {
        });

        access_Token = jsonMap.get("access_token").toString();
        refresh_Token = jsonMap.get("refresh_token").toString();

        System.out.println("access_token : " + access_Token);
        System.out.println("refresh_token : " + refresh_Token);

        br.close();
        bw.close();

        kakaoUserId = searchKakaoUserInfo(access_Token);

        return kakaoUserId;
    }

    @Override
    public String searchKakaoUserInfo(String access_Token) throws Exception {
        String kakao_auth_id = "";
        String reqURL = "https://kapi.kakao.com/v2/user/me";

        URL url = new URL(reqURL);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");

        // 요청에 필요한 Header에 포함될 내용
        conn.setRequestProperty("Authorization", "Bearer " + access_Token);

        BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));

        String line = "";
        String result = "";

        while ((line = br.readLine()) != null) {
            result += line;
        }

        // jackson objectmapper 객체 생성
        ObjectMapper objectMapper = new ObjectMapper();
        // JSON String -> Map
        HashMap<String, Object> userInfo = (HashMap<String, Object>) objectMapper.readValue(result, new TypeReference<Map<String, Object>>() {});
        kakao_auth_id = userInfo.get("id").toString();
        return kakao_auth_id;
    }

    @Override
    public void addUser(UserRequest userRequest) throws Exception {
        Optional<UserEntity> userEntity = userRepository.findByUserNo(Integer.parseInt(userRequest.getUserNo()));
        UserEntity user = UserEntity.builder()
                .userNo(Integer.parseInt(userRequest.getUserNo()))
                .userId(userEntity.get().getUserId())
                .userNickname(userRequest.getUserNickname())
                .userBirthday(userRequest.getUserBirthday())
                .userProfile(userRequest.getUserProfile())
                .build();
        userRepository.save(user);
    }

    @Override
    public UserEntity searchUserInfoByKakaoUserId(String userId) throws Exception {
        return userRepository.findByUserId(userId).get();
    }

    @Override
    public String createToken(int userNo, String type) throws Exception {
        long tokenValidTime = 0L;
        if(type.equals("access-token")) {
            tokenValidTime = 30 * 60 * 1000L; // Access 토큰 유효시간 30분
        } else {
            tokenValidTime = 14 * 24 * 60 * 60 * 1000L; // Access 토큰 유효시간 2주
        }
        return JwtUtil.createJwt(userNo, type, JWT_SECRET_KEY, tokenValidTime);
    }

    @Override
    public void addRefreshToken(int userNo, String refreshToken) throws Exception {
        Optional<UserEntity> userEntity = userRepository.findByUserNo(userNo);
        UserEntity user = UserEntity.builder()
                .userNo(userEntity.get().getUserNo())
                .userId(userEntity.get().getUserId())
                .userNickname(userEntity.get().getUserNickname())
                .userBirthday(userEntity.get().getUserBirthday())
                .userProfile(userEntity.get().getUserProfile())
                .Wrefreshtoken(refreshToken)
                .build();
        userRepository.save(user);
    }
}
