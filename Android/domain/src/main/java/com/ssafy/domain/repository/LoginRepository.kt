package com.ssafy.domain.repository

import com.ssafy.domain.model.login.CheckKakaoToken

interface LoginRepository {
    suspend fun checkKakaoToken(token: String): Result<CheckKakaoToken>
}