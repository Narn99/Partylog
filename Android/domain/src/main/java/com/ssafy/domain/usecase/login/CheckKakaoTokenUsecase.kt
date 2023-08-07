package com.ssafy.domain.usecase.login

import com.ssafy.domain.repository.LoginRepository

class CheckKakaoTokenUsecase(private val repository: LoginRepository) {
    suspend operator fun invoke(token: String): Boolean {
       return repository.checkKakaoToken(token)
    }
}