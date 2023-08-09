package com.ssafy.partylog.api.service;

import com.ssafy.partylog.api.request.LetterRequest;
import com.ssafy.partylog.api.response.LetterResponseBody;

import java.util.List;

public interface LetterService {
    //작성, 삭제, 전체 불러오기(아이디별), 상세보기
    String addLetter(LetterRequest letter, int loginUserNo) throws Exception;
    int deleteLetter(String letterNo) throws Exception;
    List<LetterResponseBody> searchLetterList(int receiverNo, int writerNo, int year, int limit, int offset);
    LetterResponseBody searchLetterById(String letterId);

}
