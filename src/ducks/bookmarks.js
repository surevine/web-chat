import { makeConstant } from "./_helpers";

const constant = makeConstant("jchat/bookmarks");

export const GET_BOOKMARKS = constant("GET_BOOKMARKS");
export const RECEIVED_BOOKMARKS = constant("RECEIVED_BOOKMARKS");

export const getBookmarks = () => ({
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

      if(action.payload) {

        return {
          ...state, conferences: action.payload.privateStorage.bookmarks.conferences
        };

        // return [
        //     ...state, action.payload.privateStorage.bookmarks.conferences
        // ];
      }

    }

    default:
      return state;
  }
};
