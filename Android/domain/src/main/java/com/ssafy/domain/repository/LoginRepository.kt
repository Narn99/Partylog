package com.ssafy.domain.repository

import com.ssafy.domain.model.login.resp.CheckBirth
import com.ssafy.domain.model.login.req.JoinWithBirthReq
import com.ssafy.domain.model.login.resp.JoinWithBirthResp

interface LoginRepository {
    suspend fun checkKakaoToken(token: String): CheckBirth
    suspend fun joinWithBirth(dto: JoinWithBirthReq): JoinWithBirthResp
    fun storeId(id: Int)
    fun getId(): Int
}