package com.ssafy.domain.repository

interface LoginRepository {
    suspend fun checkKakaoToken(token: String): Boolean
}