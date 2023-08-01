package com.ssafy.partylog.ui.login

import android.util.Log
import androidx.lifecycle.ViewModel
import com.kakao.sdk.user.UserApiClient
import com.ssafy.partylog.GlobalApplication
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow

class LoginViewModel: ViewModel() {
    private val _uiState = MutableStateFlow(LoginState())
    val uiState: StateFlow<LoginState>
        get() = _uiState.asStateFlow()

    fun onKakaoSelected() {
        if (UserApiClient.instance.isKakaoTalkLoginAvailable(GlobalApplication.context)) {
            UserApiClient.instance.loginWithKakaoTalk(GlobalApplication.context) { token, error ->
                if (error != null) {
                    Log.e("로그인 실패", error.toString())
                } else if (token != null) {
                    Log.d("로그인 성공", "${token.accessToken}")
                }
            }
        }
        else {
            UserApiClient.instance.loginWithKakaoAccount(GlobalApplication.context) { token, error ->
                if (error != null) {
                    Log.e("로그인 실패", error.toString())
                }
                else if (token != null) {
                    Log.d("로그인 성공", "${token.accessToken}")
                }
            }
        }
    }
}