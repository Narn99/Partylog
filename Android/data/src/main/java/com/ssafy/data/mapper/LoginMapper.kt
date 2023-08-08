package com.ssafy.data.mapper

import com.ssafy.data.model.login.KakaoCheckRespDto
import com.ssafy.domain.model.login.CheckKakaoToken

object LoginMapper {
    fun checkKakaoRespToResult(dto: KakaoCheckRespDto): CheckKakaoToken {
        return CheckKakaoToken(
            dto.code == "200" || dto.code == "201"
        )

    }
}