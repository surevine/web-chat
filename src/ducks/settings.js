import { makeConstant } from "./_helpers";

const constant = makeConstant("jchat/settings");

export const SAVE_SETTINGS = constant("SAVE_SETTINGS");

export const saveSettings = (settings) => ({
  type: SAVE_SETTINGS,
  payload: { settings }
});

const initialState = {
    userNotifications: false,
    formNotifications: true,
    keywords: ['medivac', 'emergency']
};

// reducer
export default (state = initialState, action) => {
  switch (action.type) {

    case SAVE_SETTINGS: {
      return action.payload.settings;
    }

    default:
      return state;
  }
};
