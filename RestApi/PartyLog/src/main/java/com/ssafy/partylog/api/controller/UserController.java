package com.ssafy.partylog.api.controller;

import com.ssafy.partylog.api.Entity.UserEntity;
import com.ssafy.partylog.api.request.UserRequest;
import com.ssafy.partylog.api.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;


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
    public ResponseEntity<String> login(@RequestParam("code") String code) throws Exception {
        System.out.println("카카오 인증 코드: " + code);
        String kakaoUserId = userService.searchKakaoAccessToken(code);
        String accessToken = "";
        String refreshToken = "";
        UserEntity user = userService.searchUserInfoByKakaoUserId(kakaoUserId);
        if(user != null) {
            accessToken = userService.createToken(user.getUserNo(), "access-token");
            refreshToken = userService.createToken(user.getUserNo(), "refresh-token");
            userService.addRefreshToken(user.getUserNo(), refreshToken);
            System.out.println(accessToken);
            System.out.println(refreshToken);
        } else {
            System.out.println("프론트로 리턴");
        }
        return new ResponseEntity<String>(accessToken, HttpStatus.OK);
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

    @PostMapping("/mypage")
    public ResponseEntity<String> searchUserInfo(Authentication authentication) throws Exception {
        return new ResponseEntity<String>("사용자 번호: " + authentication.getName(), HttpStatus.OK);
    }
}
