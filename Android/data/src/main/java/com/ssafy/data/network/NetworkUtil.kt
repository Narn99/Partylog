package com.ssafy.data.network

import com.jakewharton.retrofit2.converter.kotlinx.serialization.asConverterFactory
import com.skydoves.sandwich.adapters.ApiResponseCallAdapterFactory
import com.ssafy.data.BuildConfig
import kotlinx.serialization.json.Json
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Retrofit


object NetworkUtil {
    private const val SERVICE_URL = BuildConfig.BASE_URL
//    private val logInterceptor = HttpLoggingInterceptor { message -> Logger.t("OKHTTP").i(message) }
//            Logger.t("OKHTTP").i(it)
//    }.setLevel(HttpLoggingInterceptor.Level.BODY)
    private val logInterceptor = HttpLoggingInterceptor().setLevel(HttpLoggingInterceptor.Level.BODY)




    private val client by lazy {
        OkHttpClient.Builder()
//            .addInterceptor(AuthInterceptor())
            .addInterceptor(logInterceptor)
            .hostnameVerifier { _, _ -> true }
            .build()
    }

    private val contentType = "application/json".toMediaType()
    val retrofit: Retrofit by lazy {
        Retrofit
            .Builder()
            .baseUrl(SERVICE_URL)
            .client(client)
            .addCallAdapterFactory(ApiResponseCallAdapterFactory.create())
            .addConverterFactory(Json.asConverterFactory(contentType = contentType))
            .build()
    }

    inline fun <reified T> create(): T = retrofit.create(T::class.java)
}

