package com.ssafy.data.model.login

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable


@Serializable
data class KakaoCheckRespDto(
    @SerialName("data")
    val data: Int,
    @SerialName("message")
    val message: String,
    @SerialName("code")
    val code: String
)