package com.ssafy.partylog.util.Network

import com.jakewharton.retrofit2.converter.kotlinx.serialization.asConverterFactory
import com.ssafy.partylog.util.Network.Interceptor.AuthInterceptor
import kotlinx.serialization.json.Json
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.OkHttpClient
import retrofit2.Retrofit

object NetworkUtil {
    const val SERVICE_URL = "http://i9a501.p.ssafy.io:8080/partylog/"
    private val contentType = "application/json".toMediaType()

    private val client =
        OkHttpClient.Builder().addInterceptor(
            AuthInterceptor()
        ).build()

    val retrofit = Retrofit
        .Builder()
        .baseUrl(SERVICE_URL)
        .addConverterFactory(Json.asConverterFactory(contentType = contentType))
        .client(client)
        .build()


    inline fun <reified T> create(): T = retrofit.create(T::class.java)
}

