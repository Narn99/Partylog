package com.ssafy.partylog.api.controller;


import com.ssafy.partylog.api.request.LetterRequest;
import com.ssafy.partylog.api.response.LetterResponse;
import com.ssafy.partylog.api.service.LetterService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<?> addLetter(@RequestBody LetterRequest letterRequest) {
        //제목 10글자 이상 제한.
        letterService.addLetter(letterRequest);
        return new ResponseEntity<Void> (HttpStatus.OK);
    }

    @DeleteMapping("/delete/{letterId}")
    @Operation(summary = "편지삭제(보내기취소)", description = "편지 보내기 취소")
    public ResponseEntity<?> deleteLetter(@PathVariable String letterId)  {
        letterService.deleteLetter(letterId);
        return new ResponseEntity<Void> (HttpStatus.OK);
    }

    @GetMapping("/list/{type}/{year}/{offset}/{limit}")
    @Operation(summary = "편지리스트", description = "편지리스트 불러오기")
    @Parameter(name="type", description="allowed : writer / receiver")
    public ResponseEntity<?> searchLetterList(@PathVariable String type, @PathVariable int year, @PathVariable int offset, @PathVariable int limit)  {
        List<LetterResponse> list = letterService.searchLetterList(type, year, offset, limit);
        return new ResponseEntity<List<LetterResponse>>(list, HttpStatus.OK);
    }

    @GetMapping("/detail/{letterId}")
    @Operation(summary = "편지상세보기", description = "편지1개 상세보기")
    public ResponseEntity<?> searchLetterById(@PathVariable String letterId)  {
        LetterResponse letter = letterService.searchLetterById(letterId);
        return new ResponseEntity<LetterResponse>(letter, HttpStatus.OK);
    }


}
