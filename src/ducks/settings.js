import { makeConstant } from "./_helpers";

const constant = makeConstant("jchat/settings");

// Saga actions
export const SET_KEYWORDS = constant("SET_KEYWORDS");

export const setKeywords = (keywords) => ({
    type: SET_KEYWORDS,
    payload: { keywords }
});

const initialState = {
    keywords: ['medivac', 'emergency']
};

// reducer
export default (state = initialState, action) => {
  switch (action.type) {

    case SET_KEYWORDS: {
      return {
        ...state,
        keywords: action.payload.keywords
      };
    }

    default:
      return state;
  }
};
