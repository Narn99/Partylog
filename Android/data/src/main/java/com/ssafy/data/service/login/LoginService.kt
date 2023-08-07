package com.ssafy.data.service.login

import com.skydoves.sandwich.ApiResponse
import com.ssafy.data.model.login.KakaoCheckRespDto
import retrofit2.http.GET
import retrofit2.http.Path

interface LoginService {
    @GET("user/mobile/login/{token}")
    suspend fun kakaoLogin(
        @Path("token") token: String
    ): ApiResponse<KakaoCheckRespDto>
}