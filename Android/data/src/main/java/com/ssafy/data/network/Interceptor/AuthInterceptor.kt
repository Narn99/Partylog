package com.ssafy.data.network.Interceptor

import okhttp3.Interceptor
import okhttp3.Response

class AuthInterceptor: Interceptor {
    override fun intercept(chain: Interceptor.Chain): Response {
      return chain.proceed(chain.request())
        //임시땜빵
    }
}