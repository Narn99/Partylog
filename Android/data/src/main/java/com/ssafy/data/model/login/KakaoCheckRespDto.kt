package com.ssafy.data.model.login

import kotlinx.serialization.Serializable


@Serializable
data class KakaoCheckRespDto(
    val code: Int,
    val message: String,
    val userInfo: UserInfo
)

data class UserInfo(
    val userBirthday: String,
    val userNickname: String,
    val userNo: Int,
    val userProfile: String
)