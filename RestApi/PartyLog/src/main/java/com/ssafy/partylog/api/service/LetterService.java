package com.ssafy.partylog.api.service;

import com.ssafy.partylog.api.request.LetterRequest;
import com.ssafy.partylog.api.response.LetterResponse;

import java.util.List;

public interface LetterService {
    //작성, 삭제, 전체 불러오기(아이디별), 상세보기
    void addLetter(LetterRequest letter, int loginUserNo);
    void deleteLetter(String letterNo);
    List<LetterResponse> searchLetterList(String type, int year, int offset, int limit, int loginUserNo);
    LetterResponse searchLetterById(String letterId);

}
