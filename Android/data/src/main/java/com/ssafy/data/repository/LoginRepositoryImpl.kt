package com.ssafy.data.repository

import com.orhanobut.logger.Logger
import com.skydoves.sandwich.onError
import com.skydoves.sandwich.onException
import com.skydoves.sandwich.onSuccess
import com.ssafy.data.datasource.remote.LoginDatasource
import com.ssafy.domain.repository.LoginRepository

class LoginRepositoryImpl(private val loginDatasource: LoginDatasource): LoginRepository {
    override suspend fun checkKakaoToken(token: String): Boolean {

        Logger.d("datasource 실행$token")
        val data = loginDatasource.checkKakaoToken(token)
        data.onSuccess {
            true
//            LoginMapper.checkKakaoRespToResult(this.data)
            Logger.d("카카오토큰 체크 성공")
        }.onError {
            false
            Logger.d("카카오토큰 체크 실패 err\n$this")
        }.onException {
            false
            Logger.d("카카오토큰 체크 실패 exception\n$this")
        }
        return false
    }
}