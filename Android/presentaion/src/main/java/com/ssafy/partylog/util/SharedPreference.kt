package com.ssafy.partylog.util

import android.content.Context

class SharedPreference(context: Context) {
    private val sprefName = "spref"
    val spref = context.getSharedPreferences(sprefName, 0)

    private val myid = "myid"


    fun setMyid(id: Int) = spref.edit().putInt(myid, id).apply()
    fun getMyid(): Int= spref.getInt(myid, -1)

}