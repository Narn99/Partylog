package com.ssafy.partylog

import android.app.Application
import com.kakao.sdk.common.KakaoSdk

class GlobalApplication: Application() {
    fun init() {
        KakaoSdk.init(this, "/y2wTgOzDZUN2l5xLLgGlxY5OKY=")
    }
}