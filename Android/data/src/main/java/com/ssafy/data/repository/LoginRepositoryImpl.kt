package com.ssafy.data.repository

import com.orhanobut.logger.Logger
import com.skydoves.sandwich.onError
import com.skydoves.sandwich.onException
import com.skydoves.sandwich.onSuccess
import com.ssafy.data.datasource.local.SharedPreference
import com.ssafy.data.datasource.remote.LoginDatasource
import com.ssafy.data.mapper.LoginMapper
import com.ssafy.data.model.login.req.JoinReqDto
import com.ssafy.domain.model.login.resp.CheckBirth
import com.ssafy.domain.model.login.req.JoinWithBirthReq
import com.ssafy.domain.model.login.resp.JoinWithBirthResp
import com.ssafy.domain.repository.LoginRepository
import javax.inject.Inject

class LoginRepositoryImpl @Inject constructor(private val loginDatasource: LoginDatasource, private val sharedPreference: SharedPreference
): LoginRepository {
    override suspend fun checkKakaoToken(token: String): CheckBirth {

        Logger.d("datasource 실행$token")
        val data = loginDatasource.checkKakaoToken(token)
        var result = CheckBirth(0, 0)
        data.onSuccess {
            result = LoginMapper.KakaoCheckRespDtoToCheckBirth(this.data)
            Logger.d("카카오토큰 체크 성공")
//            LoginMapper.checkKakaoRespToResult(this.data)
        }.onError {
            result = LoginMapper.KakaoCheckRespDtoToCheckBirth(this.response.body()!!)
            Logger.d("카카오토큰 체크 실패 err\n$this")
        }.onException {
            Logger.d("카카오토큰 체크 실패 exception\n$this")
        }
        return result
    }

    override suspend fun joinWithBirth(data: JoinWithBirthReq): JoinWithBirthResp {
        val resp = loginDatasource.getJoin(JoinReqDto(userBirthday = data.birth, userNo= data.id))
        var result = JoinWithBirthResp(code = -1, id = -1)

        resp.onSuccess {
            result = LoginMapper.joinWithBirthToJoin(this.data)
        }
            .onError {
                result = LoginMapper.joinWithBirthToJoin(this.response.body()!!)
            }.onException {
            }

        return result
    }

    override fun storeId(id: Int) {
        sharedPreference.setMyid(id)
    }

    override fun getId(): Int {
        return sharedPreference.getMyid()
    }
}