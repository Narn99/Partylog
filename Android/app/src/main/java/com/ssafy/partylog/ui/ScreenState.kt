package com.ssafy.partylog.ui

import androidx.compose.runtime.Composable
import androidx.compose.ui.platform.LocalContext
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.ssafy.partylog.ui.login.Login
import com.ssafy.partylog.ui.login.LoginViewModel
import com.ssafy.partylog.ui.main.Main

enum class ScreenState {
    Login,
    Main,
    Live
}

@Composable
fun NaviCtrl() {
    lateinit var loginViewModel: LoginViewModel
    val navController = rememberNavController()

    NavHost(navController = navController, startDestination = ScreenState.Login.name) {
        composable(route = ScreenState.Login.name) {
            Login(onKakaoSelected = {
                loginViewModel.kakaoLogin()
            })
            loginViewModel = LoginViewModel(LocalContext.current)
        }
        composable(route = ScreenState.Main.name) {

            Main()
        }

    }
}