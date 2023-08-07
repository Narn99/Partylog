package com.ssafy.data.datasource.remote

import com.skydoves.sandwich.ApiResponse
import com.ssafy.data.model.login.KakaoCheckRespDto
import com.ssafy.data.network.ServicePool

class LoginDatasource {
    private val service = ServicePool.loginService
    suspend fun checkKakaoToken(token: String): ApiResponse<KakaoCheckRespDto> = service.kakaoLogin(token)
}