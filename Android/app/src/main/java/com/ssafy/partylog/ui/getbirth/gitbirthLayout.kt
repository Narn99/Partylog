package com.ssafy.partylog.ui.getbirth

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.runtime.Composable
import androidx.compose.ui.tooling.preview.Preview
import com.chargemap.compose.numberpicker.NumberPicker

@Composable
fun Getbirth() {
    Column {
        title()
        picker()
        button()
    }
}

@Composable
fun Title() {

}

@Composable
fun Picker() {

}

@Composable
fun Button() {
    var
    Row {
        NumberPicker(value = , onValueChange = , range = )
    }
}

@Composable
@Preview
fun GetBirthPrev() {
    Getbirth()
}