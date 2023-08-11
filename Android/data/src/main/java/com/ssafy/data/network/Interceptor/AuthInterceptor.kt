package com.ssafy.data.network.Interceptor

import android.content.SharedPreferences
import com.ssafy.data.datasource.local.SharedPreference
import com.ssafy.data.repository.LoginRepositoryImpl
import com.ssafy.domain.repository.LoginRepository
import com.ssafy.domain.usecase.login.GetidUsecase
import dagger.hilt.android.qualifiers.ApplicationContext
import okhttp3.Interceptor
import okhttp3.Response
import javax.inject.Inject

class AuthInterceptor(private val sharedPreference: SharedPreference) : Interceptor {
    override fun intercept(chain: Interceptor.Chain): Response {
        val origin = chain.request()
        if (origin.url.encodedPath.equals("user/mobile/login", true)||
            origin.url.encodedPath.equals("user/join", true)) {
            //jwt 필요없는 요청들
        }
        else {
            chain.proceed(origin.newBuilder().apply {
                addHeader(
                    "Authorization",
                    "Bearer " + sharedPreference.getAccessToken()
                )
            }.build())
        }
      return chain.proceed(chain.request())
    }
}