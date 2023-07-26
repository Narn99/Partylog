package com.ssafy.partylog.ui.login

import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.res.vectorResource
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.ssafy.partylog.R
import com.ssafy.partylog.ui.theme.PartylogTheme
import com.ssafy.partylog.ui.theme.loginTextColor
import com.ssafy.partylog.ui.theme.maplestory

@Composable
fun Login(modifier: Modifier = Modifier, font: FontFamily = maplestory) {
    Surface(modifier = modifier) {
        Column(horizontalAlignment = Alignment.CenterHorizontally,
            modifier = modifier) {
            Image(painter = painterResource(id = R.drawable.ic_login_logo), contentDescription = "login")
            Text(text = stringResource(id =R.string.first_greeting),
                fontFamily = font, fontWeight = FontWeight.Light,
                color = loginTextColor)
            Image(imageVector = ImageVector.vectorResource(id = R.drawable.ic_login_kakaologin),
                contentDescription = "kakaoLogin",
                modifier = modifier.padding(bottom = 124.dp))
        }
    }
}
@Composable
@Preview(showBackground = true)
fun Preview() {
    PartylogTheme() {
        Login()
    }
}