package com.ssafy.data.network.Interceptor

import okhttp3.Interceptor
import okhttp3.Response

class AuthInterceptor: Interceptor {
    override fun intercept(chain: Interceptor.Chain): Response {
        val origin = chain.request()
//        if (origin.url.encodedPath.equals("user/mobile/login", true)||
//            origin.url.encodedPath.equals("user/join", true)) {
//            //jwt 필요없는 요청들
//        }
//        else {
//            chain.proceed(origin.newBuilder().apply{
//                addHeader(
//                    "Authorization",
//                    "Bearer "  + "a"
//                )
//            })
//        }
      return chain.proceed(chain.request())
        //임시땜빵
    }
}