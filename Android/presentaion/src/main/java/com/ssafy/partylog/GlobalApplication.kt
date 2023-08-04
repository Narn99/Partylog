package com.ssafy.partylog

import android.app.Application
import com.kakao.sdk.common.KakaoSdk
import com.ssafy.partylog.koin.module
import org.koin.android.ext.koin.androidContext
import org.koin.core.context.startKoin

class GlobalApplication: Application() {
    override fun onCreate() {
        super.onCreate()
        init()
    }
    fun init() {
        KakaoSdk.init(this, appKey = BuildConfig.NATIVE_APP_KEY)



        startKoin {
            androidContext(this@GlobalApplication)
            modules(module)
        }
    }
}