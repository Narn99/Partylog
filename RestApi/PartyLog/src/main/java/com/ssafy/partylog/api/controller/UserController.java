package com.ssafy.partylog.api.controller;

import com.ssafy.partylog.api.request.UserRequest;
import com.ssafy.partylog.api.response.UserResponse;
import com.ssafy.partylog.api.service.UserService;
import com.ssafy.partylog.token.JwtTokenProvider;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;


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

    @PostMapping("/regist")
    @Operation(summary = "회원가입", description = "회원가입을 진행합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successful Operation", content = @Content(array = @ArraySchema(schema = @Schema(implementation = UserResponse.class)))),
            @ApiResponse(responseCode = "400", description = "Invalid"),
            @ApiResponse(responseCode = "404", description = "Not found")
    })
    @Parameter(name = "userInfo", description = "회원가입 시 받는 회원정보")
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
    @Operation(summary = "로그인", description = "로그인을 진행합니다.")
    @Parameter(name = "code", description = "카카오에서 발급해준 인증코드")
    public ResponseEntity<HashMap<String, Object>> loginUser(@RequestParam("code") String code) throws Exception {
        System.out.println("카카오 인증 코드: " + code);
        HashMap<String, Object> resultMap = new HashMap<>();
        // 카카오 토큰 발급
        String kakao_Access_Token = userService.getKakaoAccessToken(code);
        HashMap<String, Object> userInfo = userService.getKakaoUserInfo(kakao_Access_Token);
        System.out.println("카카오 내 정보: " + userInfo);
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
