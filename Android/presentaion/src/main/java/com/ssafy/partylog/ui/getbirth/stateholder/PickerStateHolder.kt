package com.ssafy.partylog.ui.getbirth.stateholder

import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import java.util.Calendar

class PickerStateHolder {
    private val _uiState = MutableStateFlow(PickerState())
    var uiState: StateFlow<PickerState> = _uiState.asStateFlow()

    private val days = arrayOf(31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31)

    fun setVal() {
        Calendar.getInstance().get(Calendar.YEAR)
    }

    fun setDefaultYear(): Int = Calendar.getInstance().get(Calendar.YEAR) - 20
    fun getMaxYear(): Int = Calendar.getInstance().get(Calendar.YEAR)
    fun getMinYear(): Int = Calendar.getInstance().get(Calendar.YEAR) - 150
    fun getMaxday(yy:Int = uiState.value.year, mm: Int = uiState.value.month): Int {
        return if (mm != 2) days[mm - 1]
        else {
            if (yy%4 == 0 && yy%100 == 0 && yy%400 == 0) 28
            else if (yy%4 == 0 && yy%100 == 0) 29
            else if (yy%4 == 0) 28
            else 29
        }
    }

    fun setYear(yy: Int) = _uiState.value.year
    fun setMonth(mm: Int) = _uiState.value.month
    fun setDay(dd: Int) = _uiState.value.day



}