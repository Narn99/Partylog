package com.ssafy.partylog.api.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class StateResponse {
    private final String code;
    private final String message;
}
