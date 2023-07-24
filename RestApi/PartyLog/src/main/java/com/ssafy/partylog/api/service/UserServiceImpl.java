package com.ssafy.partylog.api.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.partylog.api.Entity.UserEntity;
import com.ssafy.partylog.api.repository.UserRepository;
import com.ssafy.partylog.api.request.UserRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

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

    @Override
    public String searchKakaoAccessToken(String code) throws Exception {
        String access_Token = "";
        String refresh_Token = "";
        String reqURL = "https://kauth.kakao.com/oauth/token";
        String result = "";
        try {
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

        } catch(IOException e) {
            e.printStackTrace();
        }
        return access_Token;
    }

    @Override
    public String searchKakaoUserInfo(String access_Token) throws Exception {
        // 요청하는 클라이언트마다 가진 정보가 다를 수 있기에 HashMap타입으로 선언
        HashMap<String, Object> userInfo = new HashMap<String, Object>();
        String kakao_auth_id = "";
        String reqURL = "https://kapi.kakao.com/v2/user/me";

        try {
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

            try {
                // jackson objectmapper 객체 생성
                ObjectMapper objectMapper = new ObjectMapper();
                // JSON String -> Map
                userInfo = (HashMap<String, Object>) objectMapper.readValue(result, new TypeReference<Map<String, Object>>() {});
                kakao_auth_id = userInfo.get("id").toString();
            } catch (Exception e) {
                e.printStackTrace();
            }

        } catch (IOException e) {
            e.printStackTrace();
        }
        return kakao_auth_id;
    }

    @Override
    public UserEntity addKakaoUserId(String kakao_auth_id) throws Exception {
        UserEntity userEntity = UserEntity.builder()
                .userId(kakao_auth_id)
                .build();
        return userRepository.save(userEntity);
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
    public Optional<UserEntity> searchUserInfoByKakaoUserId(String userId) throws Exception {
        return userRepository.findByUserId(userId);
    }
}
