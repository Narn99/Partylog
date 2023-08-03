package com.ssafy.partylog.util.network.login

import android.util.Log
import com.ssafy.partylog.data.resp.KakaoLogin
import com.ssafy.presentation.login.stateholder.LoginViewModel
import com.ssafy.partylog.util.network.RetroServicePool
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class LoginServiceImpl {
    suspend fun kakaoLogin(token: String, viewModel: com.ssafy.presentation.login.stateholder.LoginViewModel): Response<KakaoLogin> =
        RetroServicePool.RetroLogin.KakaoLogin()
}