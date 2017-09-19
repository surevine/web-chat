import { makeConstant } from "./_helpers";

const constant = makeConstant("jchat/user");

// maybe leave here as a backup/global ?
export const SET_NICKNAME = constant("SET_NICKNAME");
export const SET_PRESENCE = constant("SET_PRESENCE");

export const setNickname = nickname => ({
  type: SET_NICKNAME,
  payload: { nickname }
});

export const setPresence = (presence, rooms)=> ({
  type: SET_PRESENCE,
  payload: { presence, rooms }
});

const initialState = {
    nickname: '',
    presence: {
      label: 'Available',
      value: 'available'
    }
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

    case SET_PRESENCE: {
      return {
        ...state,
        presence: action.payload.presence
      };
    }

    default:
      return state;
  }
};
