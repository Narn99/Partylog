package com.ssafy.data.service.login

import com.skydoves.sandwich.ApiResponse
import com.ssafy.data.model.login.KakaoCheckRespDto
import retrofit2.http.GET
import retrofit2.http.Path
import retrofit2.http.Query

interface LoginService {
    @GET("user/mobile/login")
    suspend fun kakaoLogin(
        @Query("token") token: String
    ): ApiResponse<KakaoCheckRespDto>
}