package com.ssafy.partylog.api.controller;


import com.ssafy.partylog.api.request.LetterRequest;
import com.ssafy.partylog.api.response.LetterResponse;
import com.ssafy.partylog.api.response.StateResponse;
import com.ssafy.partylog.api.service.LetterService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/letter")
@Tag(name = "LetterController", description = "레터(메시지) 관련 API")
public class LetterController {

    private LetterService letterService;

    @Autowired
    public LetterController(LetterService letterService) {
        this.letterService = letterService;
    }

    @PostMapping("/send")
    @Operation(summary = "편지보내기", description = "다른 유저에게 편지 보내기")
    public ResponseEntity<StateResponse> addLetter(@RequestBody LetterRequest letterRequest, Authentication authentication) {
        //제목 10글자 이상 제한.
        int loginUserNo = Integer.parseInt(authentication.getName());
        
        //메시지
        String message = "";
        
        // 편지 저장
        int status = letterService.addLetter(letterRequest, loginUserNo);

        if(status == 1){
            message = "편지 보내기 성공";
            StateResponse reply = new StateResponse("201", message);
            return new ResponseEntity<StateResponse>(reply, HttpStatus.CREATED);
        }else {
            message = "편지 보내기 실패";
            StateResponse reply = new StateResponse("400",message);
            return new ResponseEntity<StateResponse>(reply, HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/delete/{letterId}")
    @Operation(summary = "편지삭제(보내기취소)", description = "편지 보내기 취소")
    public ResponseEntity<StateResponse> deleteLetter(@PathVariable String letterId)  {
        //메시지
        String message = "";

        //편지 삭제
        int status = letterService.deleteLetter(letterId);

        if(status == 1){
            message = "편지 삭제 성공";
            StateResponse reply = new StateResponse("200", message);
            return new ResponseEntity<StateResponse>(reply, HttpStatus.OK);
        }else {
            message = "편지 삭제 실패";
            StateResponse reply = new StateResponse("400",message);
            return new ResponseEntity<StateResponse>(reply, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/list/{type}/{year}/{offset}/{limit}")
    @Operation(summary = "편지리스트", description = "편지리스트 불러오기")
    @Parameter(name="type", description="allowed : writer / receiver")
    public ResponseEntity<List<LetterResponse>> searchLetterList(@PathVariable String type, @PathVariable int year, @PathVariable int offset, @PathVariable int limit, Authentication authentication)  {
        int loginUserNo = Integer.parseInt(authentication.getName());
        List<LetterResponse> list = letterService.searchLetterList(type, year, offset, limit, loginUserNo);
        return new ResponseEntity<List<LetterResponse>>(list, HttpStatus.OK);
    }

    @GetMapping("/detail/{letterId}")
    @Operation(summary = "편지상세보기", description = "편지1개 상세보기")
    public ResponseEntity<LetterResponse> searchLetterById(@PathVariable String letterId)  {
        LetterResponse letter = letterService.searchLetterById(letterId);
        return new ResponseEntity<LetterResponse>(letter, HttpStatus.OK);
    }


}
