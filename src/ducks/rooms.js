import { makeConstant } from "./_helpers";

import forEach from "lodash/forEach";
import omit from "lodash/omit";

const constant = makeConstant("jchat/rooms");

export const JOIN_ROOM = constant("JOIN_ROOM");
export const JOINED_ROOM = constant("JOINED_ROOM");

export const LEAVE_ROOM = constant("LEAVE_ROOM");
export const LEFT_ROOM = constant("LEFT_ROOM");

export const TOPIC_UPDATED = constant("TOPIC_UPDATED");
export const SHOW_ROOM = constant("SHOW_ROOM");
export const HIDE_ROOM = constant("HIDE_ROOM");

export const INCREMENT_UNREAD = constant("INCREMENT_UNREAD");

export const joinRoom = (jid, nickname) => ({
  type: JOIN_ROOM,
  payload: { jid, nickname }
});

export const joinedRoom = (jid, nickname) => ({
  type: JOINED_ROOM,
  payload: { jid, nickname }
});

export const leaveRoom = (jid, nickname) => ({
  type: LEAVE_ROOM,
  payload: { jid, nickname }
});

export const leftRoom = (jid) => ({
  type: LEFT_ROOM,
  payload: { jid }
});


export const topicUpdated = (message) => ({
  type: TOPIC_UPDATED,
  payload: { message }
});

export const showRoom = (jid, nickname) => ({
  type: SHOW_ROOM,
  payload: {
    jid,
    nickname
  }
});

export const hideRoom = (jid) => ({
  type: HIDE_ROOM,
  payload: { jid }
});

export const incrementUnreadCount = (jid) => ({
  type: INCREMENT_UNREAD,
  payload: { jid }
});

// reducer
export default (state = {}, action) => {
  switch (action.type) {
    

    case JOINED_ROOM: {
      return {
        ...state,
        [action.payload.jid]: {
          jid: action.payload.jid,
          topic: "",
          nickname: action.payload.nickname,
          isCurrent: false,
          unreadMessageCount: 1
        }
      };
    }

    case LEFT_ROOM: {

      return omit(state, [ action.payload.jid ]);

    }

    case TOPIC_UPDATED: {

      const message = action.payload.message;

      // TODO ensure it exists
      const room = state[message.from.bare];

      return {
          ...state,
          [room.jid]: {
            ...room,
            topic: message.subject
          }
      }
    }

    case SHOW_ROOM: {

      const room = state[action.payload.jid];
      if(!room) {
        return state;
      }

      forEach(state, function(room) {
        room.isCurrent = false;
      });

      return {
        ...state,
        [room.jid]: {
          ...room,
          isCurrent: true,
          unreadMessageCount: 0
        }
      };

    }

    case HIDE_ROOM: {

      const room = state[action.payload.jid];
      if(!room) {
        return state;
      }

      return {
        ...state,
        [room.jid]: {
          ...room,
          isCurrent: false
        }
      };

    }

    case INCREMENT_UNREAD: {

      const room = state[action.payload.jid];
      if(!room || room.isCurrent) {
        return state;
      }

      // TODO add upper limit - 99? - show 99+
      let unreadCount = room.unreadMessageCount + 1;

      return {
        ...state,
        [room.jid]: {
          ...room,
          unreadMessageCount: unreadCount
        }
      };

    }

    default:
      return state;
  }
};
