package com.ssafy.domain.usecase.login

import com.ssafy.domain.repository.LoginRepository
import javax.inject.Inject

class CheckAccessTokenUsecase @Inject constructor(private val loginRepository: LoginRepository) {
    suspend operator fun invoke() {
        return loginRepository.checkAccessToken()
    }
}