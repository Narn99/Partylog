package com.ssafy.partylog.ui.login.stateholder

class LoginFrameStateHolder(private var viewModel: LoginViewModel) {
    fun onKakaoSelected() {
        viewModel.kakaoLogin()
    }
}