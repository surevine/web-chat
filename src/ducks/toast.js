import { makeConstant } from "./_helpers";

const constant = makeConstant("jchat/toast");

export const SHOW_TOAST = constant("SHOW_TOAST");

export const showToast = (message, type) => ({
  type: SHOW_TOAST,
  payload: { message, type }
});

const initialState = {};

// reducer
export default (state = initialState, action) => {
  switch (action.type) {

    case SHOW_TOAST: {
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
