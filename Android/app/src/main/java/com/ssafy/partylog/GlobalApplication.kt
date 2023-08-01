package com.ssafy.partylog

import android.app.Application
import android.content.Context
import android.util.Log
import com.kakao.sdk.common.KakaoSdk
import com.kakao.sdk.common.util.Utility

class GlobalApplication: Application() {
    companion object {
        lateinit var context: Context
    }

    override fun onCreate() {
        super.onCreate()
        init()
        var key = Utility.getKeyHash(this)
        Log.d("key", key)
    }
    fun init() {
        KakaoSdk.init(this, appKey = "a" + "${BuildConfig.NATIVE_APP_KEY}")
    }
}