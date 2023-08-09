package com.ssafy.partylog.api.request;

import com.ssafy.partylog.api.response.LetterResponseBody;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class LetterGetRequest {
    private int receiverNo;
    private int writerNo;
    private int year;
    private int limit;
    private int offset;
}
