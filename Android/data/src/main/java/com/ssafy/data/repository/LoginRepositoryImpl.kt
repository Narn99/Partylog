package com.ssafy.data.repository

import com.orhanobut.logger.Logger
import com.skydoves.sandwich.onError
import com.skydoves.sandwich.onException
import com.skydoves.sandwich.onSuccess
import com.ssafy.data.datasource.remote.LoginDatasource
import com.ssafy.domain.repository.LoginRepository
import javax.inject.Inject

class LoginRepositoryImpl @Inject constructor(private val loginDatasource: LoginDatasource): LoginRepository {
    override suspend fun checkKakaoToken(token: String): Int {

        Logger.d("datasource 실행$token")
        val data = loginDatasource.checkKakaoToken(token)
        var result = -1
        data.onSuccess {
            Logger.d("카카오토큰 체크 성공")
            result = Integer.parseInt(this.data.code)
//            LoginMapper.checkKakaoRespToResult(this.data)
        }.onError {
            Logger.d("카카오토큰 체크 실패 err\n$this")
        }.onException {
            Logger.d("카카오토큰 체크 실패 exception\n$this")
        }
        return result
    }
}