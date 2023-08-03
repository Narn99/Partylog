package com.ssafy.data.datasource.remote

import com.ssafy.data.model.login.KakaoCheckRespDto
import com.ssafy.data.network.ServicePool
import com.ssafy.domain.model.login.CheckKakaoToken

class LoginDatasource {
    suspend fun checkKakaoToken(token: String): KakaoCheckRespDto{
        return ServicePool.RetroLogin.kakaoLogin(token)
    }
}