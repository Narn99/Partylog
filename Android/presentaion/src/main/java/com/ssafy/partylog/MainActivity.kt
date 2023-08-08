package com.ssafy.partylog

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.navigation.compose.rememberNavController
import com.ssafy.partylog.ui.login.Login
import com.ssafy.partylog.ui.theme.PartylogTheme
import com.ssafy.partylog.util.ScreenState
import dagger.hilt.android.AndroidEntryPoint

@AndroidEntryPoint
class MainActivity: ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            PartylogTheme {
                Login()
            }
        }
    }
}