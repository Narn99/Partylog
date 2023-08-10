package com.ssafy.data.datasource.remote

import com.skydoves.sandwich.ApiResponse
import com.ssafy.data.model.login.req.JoinReqDto
import com.ssafy.data.model.login.resp.CommRespDto
import com.ssafy.data.network.ServicePool

class LoginDatasource {
    private val service = ServicePool.loginService
    suspend fun checkKakaoToken(token: String): ApiResponse<CommRespDto> = service.kakaoLogin(token)
    suspend fun getJoin(data: JoinReqDto): ApiResponse<CommRespDto> = service.joinWithbirth(data)
}