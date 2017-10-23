import { makeConstant } from "./_helpers";

const constant = makeConstant("jchat/toast");

export const SHOW_NOTIFICATION = constant("SHOW_NOTIFICATION");

export const showNotification = (message, type) => ({
  type: SHOW_NOTIFICATION,
  payload: { message, type }
});

const initialState = {};

// reducer
export default (state = initialState, action) => {
  switch (action.type) {

    case SHOW_NOTIFICATION: {
      return {
        ...state,
        message: action.payload.message,
        type: action.payload.type
      };
    }

    default:
      return state;
  }
};
