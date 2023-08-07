package com.ssafy.partylog.koin

import com.jakewharton.retrofit2.converter.kotlinx.serialization.asConverterFactory
import com.skydoves.sandwich.adapters.ApiResponseCallAdapterFactory
import com.ssafy.data.datasource.remote.LoginDatasource
import com.ssafy.data.repository.LoginRepositoryImpl
import com.ssafy.domain.repository.LoginRepository
import com.ssafy.partylog.BuildConfig
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import kotlinx.serialization.json.Json
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.OkHttpClient
import retrofit2.Retrofit
import javax.inject.Singleton


@Module
@InstallIn(SingletonComponent::class)
object ApiModule {
    @Singleton
    @Provides
    fun provideRetrofit(okHttpClient: OkHttpClient): Retrofit {
        return Retrofit.Builder()
            .baseUrl(BuildConfig.BASE_URL)
            .client(okHttpClient)
            .addCallAdapterFactory(ApiResponseCallAdapterFactory.create())
            .addConverterFactory(Json.asConverterFactory("application/json".toMediaType()))
            .build()
    }

    @Singleton
    @Provides
    fun provideLoginRepository(loginDatasource: LoginDatasource): LoginRepository {
        return LoginRepositoryImpl(loginDatasource)
    }

    @Singleton
    @Provides
    fun provideLoginDataSource(): LoginDatasource {
        return LoginDatasource()
    }
}