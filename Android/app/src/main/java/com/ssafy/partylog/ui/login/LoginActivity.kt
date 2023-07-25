package com.ssafy.partylog.ui.login

import android.os.Bundle
import android.os.PersistableBundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import com.ssafy.partylog.ui.theme.PartylogTheme

class LoginActivity: ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?, persistentState: PersistableBundle?) {
        super.onCreate(savedInstanceState, persistentState)

        setContent {
            PartylogTheme() {
            }

        }
    }
}