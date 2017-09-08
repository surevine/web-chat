import { makeConstant } from "./_helpers";

const constant = makeConstant("jchat/rooms");

export const JOIN_ROOM = constant("JOIN_ROOM");
export const JOINED_ROOM = constant("JOINED_ROOM");

export const joinRoom = (jid, nickname) => ({
  type: JOIN_ROOM,
  payload: { jid, nickname }
});

export const joinedRoom = jid => ({
  type: JOINED_ROOM,
  payload: { jid }
});

// reducer
export default (state = [], action) => {
  switch (action.type) {
    case JOINED_ROOM: {
      return {
        ...state,
        [action.payload.jid]: {
          members: []
        }
      };
    }

    default:
      return state;
  }
};
