package com.ssafy.data.network

import com.ssafy.data.service.login.LoginService


object ServicePool {
    val loginService = NetworkUtil.create<LoginService>()
}