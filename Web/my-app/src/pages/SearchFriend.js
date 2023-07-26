import React from "react";
import axios from "axios";

function SearchFriend(props) {
    const searchFriends = () => {
        axios
        .get(
            `https://kapi.kakao.com/v1/api/talk/friends`,
            {headers : 
                {
                Authorization: "Bearer pglVe9LhzUoIT2r15_o5uzGTofu6IRNfeiK4_WMNCj1z7AAAAYlw1VGu"
                }
            }
            )
        .then((res) => {
            console.log(res);
        }).catch((e) => {
            console.log(e)
        })
    }

    const getMyProfile = () => {
        axios
        .get(
            `https://kapi.kakao.com/v1/api/talk/profile`,
            {headers : 
                {
                Authorization: "Bearer pglVe9LhzUoIT2r15_o5uzGTofu6IRNfeiK4_WMNCj1z7AAAAYlw1VGu"
                }
            }
            )
        .then((res) => {
            console.log(res)
        })
    }

    return (
        <div>
            <h1>친구찾기 페이지입니다</h1>
            <h2>{`나중에 필요한 기능이 추가될 수도 있습니다`}</h2>
            <button onClick={searchFriends}>친구 목록 불러오기</button>
            <button onClick={getMyProfile}>내 프로필 불러오기</button>
        </div>
    );

    }
export default SearchFriend;