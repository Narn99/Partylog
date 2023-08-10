package com.ssafy.partylog.ui.login.stateholder

import android.app.Application
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.viewModelScope
import com.orhanobut.logger.Logger
import com.ssafy.domain.usecase.login.CheckKakaoTokenUsecase
import com.ssafy.partylog.ui.login.LoginState
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class LoginViewModel @Inject constructor(private val application: Application,
    private val checkKakaoTokenUsecase: CheckKakaoTokenUsecase): AndroidViewModel(
        application
) {
    private val _uiState = MutableStateFlow(LoginState())
    val uiState: StateFlow<LoginState>
        get() = _uiState.asStateFlow()

    var loginCode by mutableStateOf(0)
        private set

    fun resetCode() {
        loginCode = 0
    }
    fun afterKakaoLogin(token: String) {
        Logger.d("토큰가지고 서버 호출")

        viewModelScope.launch {
            loginCode = checkKakaoTokenUsecase(token)
        }
    }
}