import { makeConstant } from "./_helpers";

const constant = makeConstant("jchat/settings");

export const LOAD_SETTINGS = constant("LOAD_SETTINGS");
export const SAVE_SETTINGS = constant("SAVE_SETTINGS");

export const APP_SETTINGS = constant("APP_SETTINGS");

export const loadSettings = () => ({
  type: LOAD_SETTINGS,
  payload: {}
});

export const saveSettings = (settings, skipLocal) => ({
  type: SAVE_SETTINGS,
  payload: { settings, skipLocal }
});

const initialState = {
    userNotifications: true,
    formNotifications: true,
    keywords: []
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
