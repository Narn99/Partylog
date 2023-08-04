package com.ssafy.partylog.api.service;

import com.ssafy.partylog.api.request.LetterRequest;
import com.ssafy.partylog.api.response.LetterResponseBody;

import java.util.List;

public interface LetterService {
    //작성, 삭제, 전체 불러오기(아이디별), 상세보기
    int addLetter(LetterRequest letter, int loginUserNo) throws Exception;
    int deleteLetter(String letterNo) throws Exception;
    List<LetterResponseBody> searchLetterList(String type, int year, int limit, int offset, int loginUserNo) throws Exception;
    LetterResponseBody searchLetterById(String letterId) throws Exception;

}
