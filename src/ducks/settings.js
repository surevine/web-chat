import { makeConstant } from "./_helpers";

const constant = makeConstant("jchat/settings");

// Saga actions
export const SET_USER_NOTIFICATION = constant("SET_USER_NOTIFICATION");
export const SET_FORM_NOTIFICATION = constant("SET_FORM_NOTIFICATION");
export const SET_KEYWORDS = constant("SET_KEYWORDS");

export const SAVE_SETTINGS = constant("SAVE_SETTINGS");

export const setUserNotification = (enabled) => ({
  type: SET_USER_NOTIFICATION,
  payload: { enabled }
});

export const setFormNotification = (enabled) => ({
  type: SET_FORM_NOTIFICATION,
  payload: { enabled }
});

export const setKeywords = (keywords) => ({
    type: SET_KEYWORDS,
    payload: { keywords }
});

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

    case SET_USER_NOTIFICATION: {

      let currentNotifications = state.notifications;      

      return {
        ...state,
        notifications: {
          ...currentNotifications,
          user: action.payload.enabled
        }
      };
    }

    case SET_USER_NOTIFICATION: {
      
      let currentNotifications = state.notifications;      

      return {
        ...state,
        notifications: {
          ...currentNotifications,
          form: action.payload.enabled
        }
      };
    }

    case SET_KEYWORDS: {
      return {
        ...state,
        keywords: action.payload.keywords
      };
    }

    case SAVE_SETTINGS: {
      return action.payload.settings;
    }

    default:
      return state;
  }
};
