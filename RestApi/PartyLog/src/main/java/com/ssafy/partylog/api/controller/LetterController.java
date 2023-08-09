package com.ssafy.partylog.api.controller;


import com.ssafy.partylog.api.request.LetterGetRequest;
import com.ssafy.partylog.api.request.LetterRequest;
import com.ssafy.partylog.api.response.LetterResponseBody;
import com.ssafy.partylog.api.response.CommonResponse;
import com.ssafy.partylog.api.service.LetterService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
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
    public ResponseEntity<CommonResponse> addLetter(@RequestBody LetterRequest letterRequest, Authentication authentication) {
        //제목 10글자 이상 제한.
        int loginUserNo = Integer.parseInt(authentication.getName());

        CommonResponse data;
        HttpStatus status;

        // 편지 저장
        try {
            letterService.addLetter(letterRequest, loginUserNo);
            data = CommonResponse.createResponse("200",letterRequest, "편지 보내기 성공");
            status = HttpStatus.OK;
        } catch(Exception e) {
            e.printStackTrace();
            data = CommonResponse.createResponseWithNoContent("400","편지 보내기 실패");
            status = HttpStatus.BAD_REQUEST;
        }

        return new ResponseEntity<CommonResponse>(data, status);
    }

    @DeleteMapping("/delete/{letterId}")
    @Operation(summary = "편지삭제(보내기취소)", description = "편지 보내기 취소")
    public ResponseEntity<CommonResponse> deleteLetter(@PathVariable String letterId)  {

        CommonResponse data;
        HttpStatus status;

        //편지 삭제
        try {
            letterService.deleteLetter(letterId);
            data = CommonResponse.createResponseWithNoContent("200","편지 삭제 성공");
            status = HttpStatus.OK;
        } catch(Exception e) {
            data = CommonResponse.createResponseWithNoContent("400","편지 삭제 실패");
            status = HttpStatus.OK;
        }

        return new ResponseEntity<CommonResponse>(data, status);
    }

    @PostMapping("/get/letters")
    @Operation(summary = "편지리스트", description = "편지리스트 불러오기")
    public ResponseEntity<CommonResponse<List<LetterResponseBody>>> searchLetterList(@RequestBody LetterGetRequest letterGetRequest)  {

        CommonResponse data;
        HttpStatus status;

        try {
            List<LetterResponseBody> list = letterService.searchLetterList(letterGetRequest.getReceiverNo(), letterGetRequest.getWriterNo(), letterGetRequest.getYear(), letterGetRequest.getLimit(), letterGetRequest.getOffset());
            data = CommonResponse.createResponse("200", list,"편지목록을 불러오는데 성공했습니다.");
            status = HttpStatus.OK;
        } catch(Exception e) {
            e.printStackTrace();
            data = CommonResponse.createResponse("400", null,"편지목록을 불러오는 도중 문제가 발생했습니다.");
            status = HttpStatus.BAD_REQUEST;
        }

        return new ResponseEntity<CommonResponse<List<LetterResponseBody>>>(data, status);
    }

    @GetMapping("/detail/{letterId}")
    @Operation(summary = "편지상세보기", description = "편지1개 상세보기")
    public ResponseEntity<CommonResponse<LetterResponseBody>> searchLetterById(@PathVariable String letterId)  {

        CommonResponse data;
        HttpStatus status;

        try {
            LetterResponseBody letter = letterService.searchLetterById(letterId);
            data = CommonResponse.createResponse("200", letter, "상세편지를 불러오는데 성공했습니다.");
            status = HttpStatus.OK;
        } catch(Exception e) {
            e.printStackTrace();
            data = CommonResponse.createResponse("400", null, "상세편지를 불러오는 도중 문제가 발생했습니다.");
            status = HttpStatus.BAD_REQUEST;
        }

        return new ResponseEntity<CommonResponse<LetterResponseBody>>(data, status);
    }


}
