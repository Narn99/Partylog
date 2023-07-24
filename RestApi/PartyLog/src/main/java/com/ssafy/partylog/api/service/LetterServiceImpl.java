package com.ssafy.partylog.api.service;

import com.ssafy.partylog.api.Entity.LetterEntity;
import com.ssafy.partylog.api.repository.LetterRepository;
import com.ssafy.partylog.api.request.LetterRequest;
import com.ssafy.partylog.api.response.LetterResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class LetterServiceImpl implements LetterService {

    private LetterRepository letterRepository;

    @Autowired
    public LetterServiceImpl(LetterRepository letterRepository) {
        this.letterRepository = letterRepository;
    }

    @Override
    public void addLetter(LetterRequest letterRequest) {
        LetterEntity letter = new LetterEntity();

        String uuid = UUID.randomUUID().toString();

        letter.setLetterId(uuid);
        letter.setLetterTitle(letterRequest.getLetterTitle());
        letter.setLetterContent(letterRequest.getLetterContent());
        //JWT 디코딩 코드 작성
        letter.setLetterWriter(1);
        letter.setLetterReceiver(letterRequest.getLetterReceiver());

        letterRepository.save(letter);
    }

    @Override
    public void deleteLetter(String letterId) {
        letterRepository.deleteByLetterId(letterId);
    }

    @Override
    public List<LetterResponse> searchLetterList(String type, int year, int offset, int limit) {
        int userNo = 1;
        List<LetterResponse> list;
        if(type.equals("writer")) {
            list = letterRepository.getLettersByWriter(userNo, year, offset, limit);
        } else {
            list = letterRepository.getLettersByReceiver(userNo, year, offset, limit);
        }
        return list;
    }
//
//    @Override
//    public LetterResponse detailLetter(String letterNo) {
//        return null;
//    }

}
