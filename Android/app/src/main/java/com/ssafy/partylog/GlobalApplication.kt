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
        var key = Utility.getKeyHash(this)
        Log.d("key", key)
        init()
    }
    fun init() {
        KakaoSdk.init(this, appKey = BuildConfig.NATIVE_APP_KEY)
    }
}