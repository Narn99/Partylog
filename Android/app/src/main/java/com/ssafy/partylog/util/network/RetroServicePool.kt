package com.ssafy.partylog.util.network

import com.ssafy.partylog.util.network.login.LoginService

object RetroServicePool {
    val RetroLogin = NetworkUtil.create<LoginService>()
}