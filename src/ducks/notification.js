import { makeConstant } from "./_helpers";

const constant = makeConstant("jchat/notification");

// Saga actions
export const SHOW_NOTIFICATION = constant("SHOW_NOTIFICATION");

export const showNotification = (title, body, tag) => ({
    type: SHOW_NOTIFICATION,
    payload: { title, body, tag }
});

const initialState = {
    title: '',
    body: '',
    tag: ''
};

// reducer
export default (state = initialState, action) => {
  switch (action.type) {

    case SHOW_NOTIFICATION: {
      return {
        ...state,
        title: action.payload.title,
        body: action.payload.body,
        tag: action.payload.tag
      };
    }

    default:
      return state;
  }
};
