package com.ssafy.partylog.ui.login

import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.Column
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.res.vectorResource
import androidx.compose.ui.tooling.preview.Preview
import com.ssafy.partylog.R

@Composable
fun Login(modifier: Modifier = Modifier.) {
    Column(horizontalAlignment = Alignment.CenterHorizontally,
    modifier = modifier) {
        Image(painter = painterResource(id = R.drawable.ic_login_logo), contentDescription = "login")
        Text(text = stringResource(id =R.string.first_greeting))
        Image(imageVector = ImageVector.vectorResource(id = R.drawable.ic_login_kakaologin), contentDescription = "")
    }
}
@Composable
@Preview
fun Preview() {
    Login()
}