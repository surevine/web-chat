import { makeConstant } from "./_helpers";

const constant = makeConstant("jchat/local");

// Saga actions
export const GET_RECENT_ROOMS = constant("GET_RECENT_ROOMS");
export const ADD_RECENT_ROOM = constant("ADD_RECENT_ROOM");

export const SET_RECENT_ROOMS = constant("SET_RECENT_ROOMS");

export const addRecentRoom = (room) => ({
  type: ADD_RECENT_ROOM,
  payload: { room }
});

export const setRecentRooms = (rooms) => ({
    type: SET_RECENT_ROOMS,
    payload: { rooms }
  });

const initialState = {
    recent: []
};

// reducer
export default (state = initialState, action) => {
  switch (action.type) {

    case SET_RECENT_ROOMS: {
      return {
        ...state,
        recent: action.payload.rooms
      };
    }

    default:
      return state;
  }
};
