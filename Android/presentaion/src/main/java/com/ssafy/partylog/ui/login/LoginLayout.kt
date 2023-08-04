package com.ssafy.partylog.ui.login

import androidx.compose.foundation.Image
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.res.vectorResource
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.ssafy.partylog.R
import com.ssafy.partylog.ui.login.stateholder.LoginFrameStateHolder
import com.ssafy.partylog.ui.login.stateholder.LoginViewModel
import com.ssafy.partylog.ui.theme.PartylogTheme
import com.ssafy.partylog.ui.theme.loginTextColor
import com.ssafy.partylog.ui.theme.maplestory
import org.koin.androidx.compose.koinViewModel

@Composable
fun Login(modifier: Modifier = Modifier, font: FontFamily = maplestory
) {
    val viewModel = koinViewModel<LoginViewModel>()

        Image(painter = painterResource(id = R.drawable.bg_login_compose), contentDescription = "bg_login",
        modifier = modifier.fillMaxSize(), contentScale = ContentScale.Fit)
        Column() {
            Column(horizontalAlignment = Alignment.CenterHorizontally,
                modifier = modifier
                    .weight(1f)
                    .fillMaxWidth(),
            verticalArrangement = Arrangement.Bottom) {
                TitleFrame(modifier, font)
            }

            Column(modifier = modifier
                .weight(1f)
                .fillMaxWidth(), verticalArrangement = Arrangement.Bottom,
            horizontalAlignment = Alignment.CenterHorizontally) {
                LoginFrame(modifier, viewModel)
            }

        }

}
@Composable
fun LoginFrame(modifier: Modifier, viewModel: LoginViewModel) {
    val stateHolder = LoginFrameStateHolder(viewModel)
    Image(imageVector = ImageVector.vectorResource(id = R.drawable.ic_login_kakaologin),
        contentDescription = "kakaoLogin",
        modifier = modifier
            .padding(bottom = 124.dp)
            .clickable {
                stateHolder.onKakaoSelected()
            })

}

@Composable
fun TitleFrame(modifier: Modifier = Modifier, font: FontFamily) {
    Image(painter = painterResource(id = R.drawable.ic_login_logo), contentDescription = "login",
        modifier = modifier
            .padding(bottom = 20.dp)
            .padding(horizontal = 47.dp)
            .fillMaxWidth(),
        contentScale = ContentScale.FillWidth)
    Text(text = stringResource(id =R.string.first_greeting),
        textAlign = TextAlign.Center,
        fontSize = 16.sp,
        fontFamily = font, fontWeight = FontWeight.Light,
        color = loginTextColor,
        modifier = modifier
            .padding(bottom = 20.dp)
            .fillMaxWidth())

}
@Composable
@Preview(showBackground = true)
fun Preview() {
    PartylogTheme() {
        Login()
    }
}