package com.ssafy.data.network

import com.jakewharton.retrofit2.converter.kotlinx.serialization.asConverterFactory
import com.orhanobut.logger.Logger
import com.skydoves.sandwich.adapters.ApiResponseCallAdapterFactory
import com.ssafy.data.BuildConfig
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonObject
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import org.json.JSONException
import org.json.JSONObject
import retrofit2.Retrofit


object NetworkUtil {
    private const val SERVICE_URL = BuildConfig.BASE_URL
    private val logInterceptor = HttpLoggingInterceptor {
        try {
            JSONObject(it)
            Logger.t("Interceptor").json(it)
        } catch (error: JSONException) {
            Logger.t("Interceptor").i(it)
        }
    }.setLevel(HttpLoggingInterceptor.Level.BODY)
//            Logger.t("OKHTTP").i(it)
//    }.setLevel(HttpLoggingInterceptor.Level.BODY)
//    private val logInterceptor = HttpLoggingInterceptor().setLevel(HttpLoggingInterceptor.Level.BODY)




    private val client by lazy {
        OkHttpClient.Builder()
//            .addInterceptor(AuthInterceptor())
            .addInterceptor(logInterceptor)
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

