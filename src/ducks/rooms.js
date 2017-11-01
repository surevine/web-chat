import { makeConstant } from "./_helpers";

import forEach from "lodash/forEach";
import omit from "lodash/omit";

const constant = makeConstant("jchat/rooms");

export const JOIN_ROOM = constant("JOIN_ROOM");
export const JOINED_ROOM = constant("JOINED_ROOM");

export const LEAVE_ROOM = constant("LEAVE_ROOM");
export const LEFT_ROOM = constant("LEFT_ROOM");

export const FAILED_JOIN_ROOM = constant("FAILED_JOIN_ROOM");

export const TOPIC_UPDATED = constant("TOPIC_UPDATED");
export const SHOW_ROOM = constant("SHOW_ROOM");
export const HIDE_ROOM = constant("HIDE_ROOM");

export const INCREMENT_UNREAD = constant("INCREMENT_UNREAD");

export const SAVE_ROOM_DRAFT = constant("SAVE_ROOM_DRAFT");

export const SHOW_FORM_MODAL = constant("SHOW_FORM_MODAL");
export const SHOW_FILE_MODAL = constant("SHOW_FILE_MODAL");
export const HIDE_MODAL = constant("HIDE_MODAL");

export const joinRoom = (jid, nickname, password) => ({
  type: JOIN_ROOM,
  payload: { jid, nickname, password }
});

export const joinedRoom = (jid, nickname) => ({
  type: JOINED_ROOM,
  payload: { jid, nickname }
});

export const leaveRoom = (jid) => ({
  type: LEAVE_ROOM,
  payload: { jid }
});

export const leftRoom = (jid) => ({
  type: LEFT_ROOM,
  payload: { jid }
});

export const failedJoinRoom = (jid, error) => ({
  type: FAILED_JOIN_ROOM,
  payload: { jid, error }
})

export const topicUpdated = (message) => ({
  type: TOPIC_UPDATED,
  payload: { message }
});

export const showRoom = (jid, nickname) => ({
  type: SHOW_ROOM,
  payload: { jid, nickname }
});

export const hideRoom = (jid) => ({
  type: HIDE_ROOM,
  payload: { jid }
});

export const incrementUnreadCount = (jid) => ({
  type: INCREMENT_UNREAD,
  payload: { jid }
});

export const saveRoomDraft = (jid, msg) => ({
  type: SAVE_ROOM_DRAFT,
  payload: { jid, msg }
});

export const showFormModal = (jid, form) => ({
  type: SHOW_FORM_MODAL,
  payload: { jid, form }
});

export const showFileModal = (jid, file) => ({
  type: SHOW_FILE_MODAL,
  payload: { jid, file }
});

export const hideModal = (jid) => ({
  type: HIDE_MODAL,
  payload: { jid }
})

// reducer
export default (state = {}, action) => {
  switch (action.type) {

    case JOIN_ROOM: {

      const room = state[action.payload.jid];
      if(room) {
        return state;
      }

      return {
        ...state,
        [action.payload.jid]: {
          jid: action.payload.jid,
          topic: "",
          nickname: action.payload.nickname,
          isCurrent: false,
          draft: '',
          unreadMessageCount: 0,
          joined: false,
          error: undefined,
          showFormModal: false,
          activeForm: null,
          showFileModal: false,
          activeFile: null,
        }
      };

    }
 
    case JOINED_ROOM: {

      const room = state[action.payload.jid];

      return {
        ...state,
        [room.jid]: {
          ...room,
          joined: true,
          error: undefined
        }
      };
    }

    case LEFT_ROOM: {

      return omit(state, [ action.payload.jid ]);

    }

    case FAILED_JOIN_ROOM: {

      const room = state[action.payload.jid];
      if(!room) {
        return state;
      }
      
      return {
        ...state,
        [room.jid]: {
          ...room,
          error: action.payload.error
        }
      };

    }

    case TOPIC_UPDATED: {

      const message = action.payload.message;
      const room = state[message.from.bare];
      if(!room) {
        return state;
      }

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

      let unreadCount = room.unreadMessageCount + 1;

      return {
        ...state,
        [room.jid]: {
          ...room,
          unreadMessageCount: unreadCount
        }
      };

    }

    case SAVE_ROOM_DRAFT: {

      const room = state[action.payload.jid];
      if(!room || room.isCurrent) {
        return state;
      }

      return {
        ...state,
        [room.jid]: {
          ...room,
          draft: action.payload.msg
        }
      };

    }

    case SHOW_FORM_MODAL: {

      const room = state[action.payload.jid];
      if(!room || !room.isCurrent) {
        return state;
      }

      return {
        ...state,
        [room.jid]: {
          ...room,
          showFormModal: true,
          activeForm: action.payload.form
        }
      };

    }

    case SHOW_FILE_MODAL: {
      
      const room = state[action.payload.jid];
      if(!room || !room.isCurrent) {
        return state;
      }

      return {
        ...state,
        [room.jid]: {
          ...room,
          showFileModal: true,
          activeFile: action.payload.file
        }
      };

    }

    case HIDE_MODAL: {

      const room = state[action.payload.jid];
      if(!room) {
        return state;
      }

      return {
        ...state,
        [room.jid]: {
          ...room,
          showFormModal: false,
          showFileModal: false,
          activeFile: null,
          activeForm: null
        }
      };

    }

    default:
      return state;
  }
};
