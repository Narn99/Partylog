package com.ssafy.partylog.api.controller;

import com.ssafy.partylog.api.Entity.UserEntity;
import com.ssafy.partylog.api.request.UserRequest;
import com.ssafy.partylog.api.response.UserResponse;
import com.ssafy.partylog.api.service.UserService;
import com.ssafy.partylog.token.JwtTokenProvider;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Optional;


@RestController
@RequestMapping("/user")
@Tag(name = "UserController", description = "사용자 관련 API")
public class UserController {

    private UserService userService;
    private final JwtTokenProvider jwtTokenProvider;

    public UserController(UserService userService, JwtTokenProvider jwtTokenProvider) {
        this.userService = userService;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @GetMapping("/login")
    @Operation(summary = "로그인", description = "로그인을 진행합니다.")
    @Parameter(name = "code", description = "카카오에서 발급해준 인증코드")
//    @ApiResponses(value = {
//            @ApiResponse(responseCode = "200", description = "Success", content = @Content(array = @ArraySchema(schema = @Schema(implementation = HashMap.class)))),
//            @ApiResponse(responseCode = "400", description = "Invalid"),
//            @ApiResponse(responseCode = "404", description = "Not found")
//    })
    public ResponseEntity<HashMap<String, Object>> loginUser(@RequestParam("code") String code) throws Exception {
        System.out.println("카카오 인증 코드: " + code);

        UserResponse userResponse = null;
        boolean isNewUser = true; // 신규 유저 여부 확인
        String accessToken = ""; // 액세스 토큰
        String refreshToken = ""; // 리프레시 토큰
        HashMap<String, Object> resultMap = new HashMap<>(); // 반환값 저장

        // 카카오 토큰 발급
        String kakao_Access_Token = userService.searchKakaoAccessToken(code);
        if(kakao_Access_Token.equals("")) { // 토큰 발급에 실패 했을 경우
            resultMap.put("code", 400);
            resultMap.put("msg", "카카오 토큰 발급에 실패했습니다.");
            return new ResponseEntity<>(resultMap, HttpStatus.OK);
        }

        // 카카오 고유 아이디 얻기
        String kakao_auth_id = userService.searchKakaoUserInfo(kakao_Access_Token);

        // 카카오 고유 아이디와 매칭되는 User 정보 검색
        Optional<UserEntity> user = userService.searchUserInfoByKakaoUserId(kakao_auth_id);
        if(user.isPresent()) { // 해당 카카오 ID가 DB에 존재 할 경우
            if(user.get().getUserBirthday() != null) { // 생일 정보가 존재 하는 경우
                userResponse = new UserResponse(
                        user.get().getUserNo(),
                        user.get().getUserBirthday(),
                        user.get().getUserNickname(),
                        user.get().getUserProfile()
                        );
                isNewUser = false;
                accessToken = jwtTokenProvider.createToken(user.get().getUserNo(), "access_token", "user");
                refreshToken = jwtTokenProvider.createToken(user.get().getUserNo(), "refresh_token", "user");
            } else { // 생일 정보가 없는 경우
                userResponse = new UserResponse(
                        user.get().getUserNo(),
                        null,
                        null,
                        null
                );
            }
        } else { // 해당 카카오 ID가 DB에 없는 경우
            UserEntity userEntity = userService.addKakaoUserId(kakao_auth_id);
            userResponse = new UserResponse(
                    userEntity.getUserNo(),
                    null,
                    null,
                    null
            );
        }

        resultMap.put("isNewUser", isNewUser);
        resultMap.put("access_token", accessToken);
        resultMap.put("refresh_token", refreshToken);
        resultMap.put("userInfo", userResponse);
        return new ResponseEntity<HashMap<String, Object>>(resultMap, HttpStatus.OK);
    }

    @PostMapping("/add")
    @Operation(summary = "회원가입", description = "회원가입을 진행합니다.")
    @Parameter(name = "userInfo", description = "회원가입 시 받는 회원정보")
//    @ApiResponses(value = {
//            @ApiResponse(responseCode = "200", description = "Success", content = @Content(array = @ArraySchema(schema = @Schema(implementation = UserResponse.class)))),
//            @ApiResponse(responseCode = "400", description = "Invalid"),
//            @ApiResponse(responseCode = "404", description = "Not found")
//    })
    public ResponseEntity<HashMap<String, Object>> addUser(@RequestBody UserRequest userRequest) throws Exception {
        HashMap<String, Object> resultMap = new HashMap<>();
        userService.addUser(userRequest);
        resultMap.put("code", "200");
        resultMap.put("msg", "회원가입 성공");
        return new ResponseEntity<HashMap<String, Object>>(resultMap, HttpStatus.OK);
    }
}
