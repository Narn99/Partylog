package com.ssafy.partylog.util.repository

interface LoginRepository {
    suspend fun kakaoLogin(token: String): Result
}