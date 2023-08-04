package com.ssafy.domain.usecase.login

import com.ssafy.domain.model.login.CheckKakaoToken
import com.ssafy.domain.repository.LoginRepository

class CheckKakaoTokenUsecase(private val repository: LoginRepository) {
    suspend fun invoke(token: String): Result<CheckKakaoToken> {
        return repository.checkKakaoToken(token)
    }
}