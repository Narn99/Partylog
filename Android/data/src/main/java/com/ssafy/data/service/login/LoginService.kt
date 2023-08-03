package com.ssafy.data.service.login

import com.ssafy.partylog.data.resp.KakaoLogin
import retrofit2.Call
import retrofit2.Response
import retrofit2.http.GET
import retrofit2.http.Path

interface LoginService {
    @GET("/user/mobile/login")
    fun kakaoLogin(
        @Path("token") token: String
    ):Response<KakaoLogin>
}