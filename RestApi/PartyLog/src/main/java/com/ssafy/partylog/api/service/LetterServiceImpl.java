package com.ssafy.partylog.api.service;

import com.ssafy.partylog.api.Entity.LetterEntity;
import com.ssafy.partylog.api.repository.LetterRepository;
import com.ssafy.partylog.api.request.LetterRequest;
import com.ssafy.partylog.api.response.LetterResponseBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    public int addLetter(LetterRequest letterRequest, int loginUserNo) {
        LetterEntity letter = new LetterEntity();

        String uuid = UUID.randomUUID().toString();

        letter.setLetterId(uuid);
        letter.setLetterTitle(letterRequest.getLetterTitle());
        letter.setLetterContent(letterRequest.getLetterContent());
        letter.setLetterWriter(loginUserNo);
        letter.setLetterReceiver(letterRequest.getLetterReceiver());

        LetterEntity check = letterRepository.save(letter);

        if(check == null) { // 저장된 값이 없다면
            return 0; //0을 반환한다.
        }else { // 저장된 값이 있다면
            return 1; // 1을 반환한다.
        }
    }

    @Override
    public int deleteLetter(String letterId) {
          return  letterRepository.deleteByLetterId(letterId);
    }

    @Override
    public List<LetterResponseBody> searchLetterList(String type, int year, int offset, int limit, int loginUserNo) {
        List<LetterResponseBody> list;
        if(type.equals("writer")) {
            list = letterRepository.getLettersByWriter(loginUserNo, year, offset, limit);
        } else {
            list = letterRepository.getLettersByReceiver(loginUserNo, year, offset, limit);
        }
        return list;
    }

    @Override
    public LetterResponseBody searchLetterById(String letterId) {
        LetterResponseBody letter = letterRepository.getLettersByLetterId(letterId);
        return letter;
    }

}
