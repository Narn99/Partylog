package com.ssafy.partylog.api.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/test")
@Tag(name = "test", description = "Swagger 테스트용 API - test")
public class TestController {

    @GetMapping("/hello")
    @Operation(summary = "summary표기", description = "description표기")
    public String hello(){
        return "hello";
    }

    @GetMapping("/exception")
    public void exceptionTest(@RequestParam("code") int code) throws Exception {
        if(code == 1) {
            throw new IllegalArgumentException();
        } else if(code == 2) {
            throw new IOException();
        } else if(code == 3) {
            throw new NoSuchElementException();
        }

    }
}
