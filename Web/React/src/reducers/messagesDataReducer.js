import * as actionTypes from "../actions/actionTypes";

const initialState = {
  // 추후에 messages를 빈 배열로 바꾸고, 백엔드와의 API 통신을 통해 받아오는거로 작성.
  // 연도 데이터도 받을텐데, 추후에 그걸 토대로 YearChips를 통한 정렬 기능 구현
  messages: [
    {
      userNo: "1",
      profile: null,
      nickname: "야로나",
      title: "몰?루",
    },
    { userNo: "2", profile: null, nickname: "앗차뜨겁다", title: "앗" },
    {
      userNo: "3",
      profile: null,
      nickname: "김치김치냡냡햡햡챱챱",
      title: "김치김치냠냠챱챱챱챱",
    },
    {
      userNo: "4",
      profile: null,
      nickname: "감자",
      title: "김치",
    },
    {
      userNo: "5",
      profile: null,
      nickname: "밥밥",
      title: "얍얍",
    },
    {
      userNo: "6",
      profile: null,
      nickname: "밥밥",
      title: "얍얍",
    },
    {
      userNo: "7",
      profile: null,
      nickname: "밥밥",
      title: "얍얍",
    },
    {
      userNo: "8",
      profile: null,
      nickname: "밥밥",
      title: "얍얍",
    },
    {
      userNo: "9",
      profile: null,
      nickname: "밥밥",
      title: "얍얍",
    },
  ],
};

export const messagesDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_MESSAGE_DATA:
      const newMessage = {
        userNo: state.messages.length + 1,
        profile: null,
        nickname: `김치맨${state.messages.length + 1}호`,
        title: action.payload.modalTitle,
      };

      const newMessages = [...state.messages, newMessage];
      return {
        ...state,
        messages: newMessages,
      };
    case actionTypes.GET_MESSAGE_DATA:
      return {
        ...state,
      };
    default:
      return state;
  }
};
