package com.ssafy.data.repository

import com.ssafy.data.datasource.remote.LoginDatasource
import com.ssafy.data.mapper.LoginMapper
import com.ssafy.domain.model.login.CheckKakaoToken
import com.ssafy.domain.repository.LoginRepository

class LoginRepositoryImpl: LoginRepository {
    override suspend fun checkKakaoToken(token: String): Result<CheckKakaoToken> =
        kotlin.runCatching {
            LoginMapper.checkKakaoRespToResult(
                LoginDatasource().checkKakaoToken(token)
            )
        }.onSuccess {

        }.onFailure {

        }
}