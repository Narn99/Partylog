package com.ssafy.data.service.login

import com.ssafy.data.model.login.KakaoCheckRespDto
import retrofit2.Response
import retrofit2.http.GET
import retrofit2.http.Path

interface LoginService {
    @GET("/user/mobile/login")
    suspend fun kakaoLogin(
        @Path("token") token: String
    ): KakaoCheckRespDto
}