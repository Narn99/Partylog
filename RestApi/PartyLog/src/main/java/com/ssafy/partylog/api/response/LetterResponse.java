package com.ssafy.partylog.api.response;

import lombok.*;


public interface LetterResponse {

    String getLetter_id();
    String getLetter_title();
    String getLetter_content();
    int getLetter_writer();
    int getLetter_receiver();
    String getLetter_reg_date();

}
