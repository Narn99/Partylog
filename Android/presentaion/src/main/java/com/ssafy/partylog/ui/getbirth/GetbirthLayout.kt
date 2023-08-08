package com.ssafy.partylog.ui.getbirth

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.material.Text
import androidx.compose.material.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.sp
import com.chargemap.compose.numberpicker.NumberPicker
import com.ssafy.partylog.R
import com.ssafy.partylog.ui.getbirth.stateholder.PickerStateHolder
import com.ssafy.partylog.ui.theme.maplestory

@Composable
fun Getbirth(modifier: Modifier = Modifier, viewModel: getbirthViewmodel = getbirthViewmodel()) {
    Column(modifier.background(Color.Red).fillMaxSize()) {
        Title(modifier)
        Picker(modifier)
        Button { viewModel.goNext() }
    }
}

@Composable
fun Title(modifier: Modifier) {
    Text(text = stringResource(id = R.string.getbirth_title),
        fontFamily = maplestory,
        fontSize = 24.sp,
        fontWeight = FontWeight.Bold,
        textAlign = TextAlign.Center,
        modifier = modifier.fillMaxWidth())
    Text(text = stringResource(id = R.string.getbirth_subtitle),
        fontFamily = maplestory,
        fontSize = 16.sp,
        fontWeight = FontWeight.Light,
        textAlign = TextAlign.Center,
        modifier = modifier.fillMaxWidth())
}

@Composable
fun Picker(modifier: Modifier) {
    val stateHolder = PickerStateHolder()
    Row {
        NumberPicker(value = stateHolder.setDefaultYear(),
            onValueChange = {stateHolder.setYear(it) },
            range = stateHolder.getMinYear()..stateHolder.getMaxYear(),
            dividersColor = Color.Black,
            textStyle = TextStyle(fontSize = 16.sp, fontFamily = maplestory))
        Spacer(modifier = modifier)
        NumberPicker(value = 1,
            onValueChange = {stateHolder.setMonth(it)},
            range = 1..12,
            dividersColor = Color.Black,
            textStyle = TextStyle(fontSize = 16.sp, fontFamily = maplestory))
        Spacer(modifier = modifier)
        NumberPicker(value = 1,
            onValueChange = {stateHolder.setDay(it)},
            range = 1..stateHolder.getMaxday(),
            dividersColor = Color.Black,
            textStyle = TextStyle(fontSize = 16.sp, fontFamily = maplestory))
    }
}

@Composable
fun Button(gonext: () -> Unit) {
    TextButton(onClick = { gonext() }) {
        Text(text = stringResource(id = R.string.getbirth_continue))
    }
}

@Composable
@Preview
fun GetBirthPrev() {
    Getbirth()
}
