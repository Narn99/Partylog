package com.ssafy.partylog.util

import androidx.compose.runtime.Composable
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.ssafy.partylog.ui.getbirth.Getbirth
import com.ssafy.partylog.ui.login.Login
import com.ssafy.partylog.ui.main.Main

enum class ScreenState {
    Login,
    Getbirth,
    Main,
    Live
}

    @Composable
    fun loginNav(): NavHostController {
        val navHostController = rememberNavController()

        NavHost(navController = navHostController, startDestination = ScreenState.Login.name) {
            composable(route = ScreenState.Login.name) {
                Login(navi = navHostController)
            }
            composable(route = ScreenState.Main.name) {
                Main()
            }
            composable(route = ScreenState.Getbirth.name) {
                Getbirth()
            }

        }

        return navHostController
    }


object GetbirthNav {
    operator fun invoke() {

    }
}
