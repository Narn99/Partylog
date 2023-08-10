package com.ssafy.partylog

import android.app.Application
import com.kakao.sdk.common.KakaoSdk
import com.orhanobut.logger.AndroidLogAdapter
import com.orhanobut.logger.Logger
import com.ssafy.partylog.util.SharedPreference
import dagger.hilt.android.HiltAndroidApp

@HiltAndroidApp
class GlobalApplication: Application() {

    companion object {
        lateinit var spref: SharedPreference
    }
    override fun onCreate() {
        super.onCreate()
        init()
    }
    fun init() {
        KakaoSdk.init(this, appKey = BuildConfig.NATIVE_APP_KEY)

        Logger.addLogAdapter(object : AndroidLogAdapter() {
            override fun isLoggable(priority: Int, tag: String?): Boolean {
                return BuildConfig.DEBUG
            }
        })

        spref = SharedPreference(applicationContext)

    }
}