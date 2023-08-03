package com.ssafy.partylog.ui

import androidx.compose.runtime.Composable
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.ssafy.presentation.login.Login
import com.ssafy.partylog.ui.main.Main

enum class ScreenState {
    Login,
    Main,
    Live
}

@Composable
fun NaviCtrl() {
    val navController = rememberNavController()

    NavHost(navController = navController, startDestination = ScreenState.Login.name) {
        composable(route = ScreenState.Login.name) {
            com.ssafy.presentation.login.Login()
        }
        composable(route = ScreenState.Main.name) {

            Main()
        }

    }
}