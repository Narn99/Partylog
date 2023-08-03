package com.ssafy.data.model.login


@Serializable
data class KakaoLogin(
    val code: String,
    val message: String,
    val userInfo: UserInfo
)

data class UserInfo(
    val userBirthday: String,
    val userNickname: String,
    val userNo: Int,
    val userProfile: String
)