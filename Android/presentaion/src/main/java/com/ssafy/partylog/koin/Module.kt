package com.ssafy.partylog.koin

import com.ssafy.data.datasource.remote.LoginDatasource
import com.ssafy.data.repository.LoginRepositoryImpl
import com.ssafy.domain.usecase.login.CheckKakaoTokenUsecase
import com.ssafy.partylog.ui.login.stateholder.LoginViewModel
import org.koin.androidx.viewmodel.dsl.viewModel
import org.koin.core.module.Module
import org.koin.dsl.module

val module: Module = module {

    single{ CheckKakaoTokenUsecase(LoginRepositoryImpl(LoginDatasource())) }

    viewModel { LoginViewModel(get(), get()) }

}