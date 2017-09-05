import { makeConstant } from "./_helpers";

const constant = makeConstant("jchat/bookmarks");

export const GET_BOOKMARKS = constant("GET_BOOKMARKS");
export const RECEIVED_BOOKMARKS = constant("RECEIVED_BOOKMARKS");

export const getBookmarks = ({
  type: GET_BOOKMARKS,
  payload: null
});

export const receivedBookmarks = bookmarks => ({
  type: RECEIVED_BOOKMARKS,
  payload: bookmarks
});

const initialState = {};

// reducer
export default (state = initialState, action) => {
  switch (action.type) {

    case RECEIVED_BOOKMARKS: {

      console.log("IN RECEIVED BOOKMARKS ACTION!!!")

        // TODO parse out title

        return [
            ...state, action.payload
        ];

    }

    default:
      return state;
  }
};
