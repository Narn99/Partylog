package com.ssafy.presentation.login.stateholder

import android.app.Application
import android.util.Log
import androidx.lifecycle.AndroidViewModel
import com.kakao.sdk.user.UserApiClient
import com.ssafy.presentation.login.LoginState
import com.ssafy.partylog.util.network.login.LoginServiceImpl
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow

class LoginViewModel(private val application: Application): AndroidViewModel(
    application
) {
    private val _uiState = MutableStateFlow(LoginState())
    val uiState: StateFlow<LoginState>
        get() = _uiState.asStateFlow()

    fun kakaoLogin() {
        if (UserApiClient.instance.isKakaoTalkLoginAvailable(application.applicationContext)) {
            UserApiClient.instance.loginWithKakaoTalk(application.applicationContext) { token, error ->
                if (error != null) {
                    Log.e("로그인 실패", error.toString())
                } else if (token != null) {
                    afterKakaoLogin(token.accessToken)
                    Log.d("로그인 성공", "${token.accessToken}")
                }
            }
        }
        else {
            UserApiClient.instance.loginWithKakaoAccount(application.applicationContext) { token, error ->
                if (error != null) {
                    Log.e("로그인 실패", error.toString())
                }
                else if (token != null) {
                    afterKakaoLogin(token.accessToken)
                    Log.d("로그인 성공", "${token.accessToken}")
                }
            }
        }
    }

    fun afterKakaoLogin(token: String) {
        LoginServiceImpl().kakaoLogin(token, this)
    }
}