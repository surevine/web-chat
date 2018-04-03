import { makeConstant } from "./_helpers";

const constant = makeConstant("jchat/bookmarks");

export const ADD_BOOKMARK = constant("ADD_BOOKMARK");
export const REMOVE_BOOKMARK = constant("REMOVE_BOOKMARK");
export const GET_BOOKMARKS = constant("GET_BOOKMARKS");
export const RECEIVED_BOOKMARKS = constant("RECEIVED_BOOKMARKS");

export const addBookmark = jid => ({
  type: ADD_BOOKMARK,
  payload: jid
});

export const removeBookmark = jid => ({
  type: REMOVE_BOOKMARK,
  payload: jid
});

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
        var conferences = {}
        action.payload.privateStorage.bookmarks.conferences.forEach(element => {
          conferences[element.jid.bare] = element
        });
        return {
          ...state, conferences: Object.values(conferences)
        };
      }
      break;
    }

    default:
      return state;
  }
};
