package com.ssafy.partylog.api.service;

import com.ssafy.partylog.api.Entity.LetterEntity;
import com.ssafy.partylog.api.repository.LetterRepository;
import com.ssafy.partylog.api.request.LetterRequest;
import com.ssafy.partylog.api.response.LetterResponse;
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
    public void addLetter(LetterRequest letterRequest, int loginUserNo) {
        LetterEntity letter = new LetterEntity();

        String uuid = UUID.randomUUID().toString();

        letter.setLetterId(uuid);
        letter.setLetterTitle(letterRequest.getLetterTitle());
        letter.setLetterContent(letterRequest.getLetterContent());
        letter.setLetterWriter(loginUserNo);
        letter.setLetterReceiver(letterRequest.getLetterReceiver());

        letterRepository.save(letter);
    }

    @Override
    public void deleteLetter(String letterId) {
            letterRepository.deleteByLetterId(letterId);
            letterRepository.deleteByLetterId(letterId);
    }

    @Override
    public List<LetterResponse> searchLetterList(String type, int year, int offset, int limit, int loginUserNo) {
        List<LetterResponse> list;
        if(type.equals("writer")) {
            list = letterRepository.getLettersByWriter(loginUserNo, year, offset, limit);
        } else {
            list = letterRepository.getLettersByReceiver(loginUserNo, year, offset, limit);
        }
        return list;
    }

    @Override
    public LetterResponse searchLetterById(String letterId) {
        LetterResponse letter = letterRepository.getLettersByLetterId(letterId);
        return letter;
    }

}
