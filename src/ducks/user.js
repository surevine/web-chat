import { makeConstant } from "./_helpers";

const constant = makeConstant("jchat/user");

// TODO move this to the room duck
// maybe leave here as a backup/global ?
export const SET_NICKNAME = constant("SET_NICKNAME");

export const setNickname = nickname => ({
  type: SET_NICKNAME,
  payload: { nickname }
});

const initialState = {
    nickname: 'Jonny Heavey'
};

// reducer
export default (state = initialState, action) => {
  switch (action.type) {

    case SET_NICKNAME: {
      return {
        ...state,
        nickname: action.payload.nickname
      };
    }

    default:
      return state;
  }
};
