package com.ssafy.data.service.login

import com.ssafy.partylog.data.resp.KakaoLogin
import com.ssafy.presentation.login.stateholder.LoginViewModel
import com.ssafy.data.network.RetroServicePool
import retrofit2.Response

class LoginServiceImpl {
    suspend fun kakaoLogin(token: String, viewModel: com.ssafy.presentation.login.stateholder.LoginViewModel): Response<KakaoLogin> =
        com.ssafy.data.network.RetroServicePool.RetroLogin.KakaoLogin()
}