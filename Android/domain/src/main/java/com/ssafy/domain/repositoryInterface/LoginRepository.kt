package com.ssafy.domain.repositoryInterface

interface LoginRepository {
    suspend fun kakaoLogin(token: String): Result
}