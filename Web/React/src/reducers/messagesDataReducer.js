import * as actionTypes from "../actions/actionTypes";
import molru from "../assets/molru.webp";

const initialState = {
  // 추후에 messages를 빈 배열로 바꾸고, 백엔드와의 API 통신을 통해 받아오는거로 작성.
  // 연도 데이터도 받을텐데, 추후에 그걸 토대로 YearChips를 통한 정렬 기능 구현
  messages: [
    {
      userNo: "1",
      profile: null,
      nickname: "야로나",
      letterTitle: "몰?루",
      letterContent: "헉 이게 됨?",
    },
    {
      userNo: "2",
      profile: null,
      nickname: "앗차뜨겁다",
      letterTitle: "앗",
      letterContent: "헉 이게 됨?",
    },
    {
      userNo: "3",
      profile: null,
      nickname: "김치김치냡냡햡햡챱챱",
      letterTitle: "김치김치냠냠챱챱챱챱",
      letterContent: "헉 이게 됨?",
    },
    {
      userNo: "4",
      profile: null,
      nickname: "감자",
      letterTitle: "김치",
      letterContent: "헉 이게 됨?",
    },
    {
      userNo: "5",
      profile: null,
      nickname: "밥밥",
      letterTitle: "얍얍",
      letterContent: "헉 이게 됨?",
    },
    {
      userNo: "6",
      profile: null,
      nickname: "밥밥",
      letterTitle: "얍얍",
      letterContent: "헉 이게 됨?",
    },
    {
      userNo: "7",
      profile: null,
      nickname: "밥밥",
      letterTitle: "얍얍",
      letterContent: "헉 이게 됨?",
    },
    {
      userNo: "8",
      profile: null,
      nickname: "밥밥",
      letterTitle: "얍얍",
      letterContent: "헉 이게 됨?",
    },
    {
      userNo: "9",
      profile: null,
      nickname: "밥밥",
      letterTitle: "얍얍",
      letterContent: "헉 이게 됨?",
    },
  ],
};

export const messagesDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_MESSAGE_DATA:
      const newMessage = {
        userNo: state.messages.length + 1,
        profile: molru,
        nickname: `김치맨${state.messages.length + 1}호`,
        letterTitle: action.payload.modalTitle,
        letterContent: "헉 됨?",
      };

      const newMessages = [...state.messages, newMessage];
      return {
        ...state,
        messages: newMessages,
      };
    case actionTypes.GET_MESSAGE_DETAIL:
      return {
        ...state,
        // messageDetail = action.payload.messageDetail,
      };
    case actionTypes.DELETE_MESSAGE_DATA:
      const { userNo } = action.payload;
      const updatedMessages = state.messages.filter(
        (message) => message.userNo !== userNo
      );
      return {
        ...state,
        messages: updatedMessages,
      };
    case actionTypes.GET_MESSAGE_LIST:
      return {
        ...state,
        // messages: action.payload.messagesList,
      };
    default:
      return state;
  }
};
