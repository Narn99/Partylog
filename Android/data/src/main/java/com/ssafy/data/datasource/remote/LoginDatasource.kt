package com.ssafy.data.datasource.remote

import com.orhanobut.logger.Logger
import com.skydoves.sandwich.ApiResponse
import com.ssafy.data.model.login.req.JoinReqDto
import com.ssafy.data.model.login.resp.CommRespDto
import com.ssafy.data.service.login.LoginService
import javax.inject.Inject

class LoginDatasource @Inject constructor(private val service: LoginService) {
    suspend fun checkKakaoToken(token: String): ApiResponse<CommRespDto> = service.kakaoLogin(token)
    suspend fun getJoin(data: JoinReqDto): ApiResponse<CommRespDto> = service.joinWithbirth(data)
    suspend fun checkAccessToken(): ApiResponse<CommRespDto> {
        Logger.d("왜 두번?")
        return service.checkAccessToken()
    }
    suspend fun checkRefreshToken(str: String): ApiResponse<CommRespDto> = service.checkRefreshToken()
}