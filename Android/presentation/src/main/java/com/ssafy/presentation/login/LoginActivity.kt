package com.ssafy.presentation.login

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import com.ssafy.partylog.ui.NaviCtrl
import com.ssafy.partylog.ui.theme.PartylogTheme
class LoginActivity: ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            PartylogTheme {
                NaviCtrl()
            }
        }
    }
}