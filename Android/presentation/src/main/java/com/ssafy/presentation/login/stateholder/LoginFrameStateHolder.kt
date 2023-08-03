package com.ssafy.presentation.login.stateholder

class LoginFrameStateHolder(private var viewModel: LoginViewModel) {
    fun onKakaoSelected() {
        viewModel.kakaoLogin()
    }
}