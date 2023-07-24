package com.ssafy.partylog.api.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LetterRequest {
    private String letterTitle;
    private String letterContent;
    private int letterReceiver;
}
