package com.ssafy.data.datasource.local

import android.content.SharedPreferences
import javax.inject.Inject

class SharedPreference @Inject constructor(sharedPreferences: SharedPreferences) {

//    lateinit var spref: SharedPreference
//    private val sprefName = "spref"
//    val spref = context.getSharedPreferences(sprefName, 0)
    companion object {
    private lateinit var spref: SharedPreferences
}
    init {
        spref = sharedPreferences
    }

    private val myid = "myid"


    fun setMyid(id: Int) = spref.edit().putInt(myid, id).apply()
    fun getMyid(): Int = spref.getInt(myid, -1)
}