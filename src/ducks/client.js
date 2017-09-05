import { makeAction, makeConstant } from "./_helpers";

const constant = makeConstant("tvx/client");

export const CONNECTED = constant("CONNECTED");
export const AUTHENTICATED = constant("AUTHENTICATED");
export const DISCONNECTED = constant("DISCONNECTED");
export const LOGIN = constant("LOGIN");
export const LOGOUT = constant("LOGOUT");
export const AUTH_FAILURE = constant("AUTH_FAILURE");
export const TRY_RECONNECT = constant("TRY_RECONNECT");

export const AUTH_ERRORS = {
  CERTIFICATE: constant("AUTH_ERROR/CERTIFICATE"),
  CREDENTIALS: constant("AUTH_ERROR/CREDENTIALS"),
  DISCONNECTED: constant("AUTH_ERROR/DISCONNECTED")
};

export const connected = makeAction(CONNECTED);
export const disconnected = makeAction(DISCONNECTED);
export const logout = makeAction(LOGOUT);
export const tryReconnect = makeAction(TRY_RECONNECT);

export const authenticated = jid => ({
  type: AUTHENTICATED,
  payload: { jid }
});

export const login = (jid, password) => ({
  type: LOGIN,
  payload: { jid, password }
});

export const authFailure = error => ({
  type: AUTH_FAILURE,
  payload: { error }
});

const INITIAL_STATE = {
  connected: false,
  authenticated: false,
  jid: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CONNECTED: {
      return {
        ...state,
        connected: true
      };
    }

    case DISCONNECTED: {
      return {
        ...state,
        connected: false
      };
    }

    case LOGOUT: {
      return {
        ...state,
        authenticated: false
      };
    }

    case AUTHENTICATED: {
      return {
        ...state,
        authenticated: true,
        jid: action.payload.jid
      };
    }

    case AUTH_FAILURE: {
      return {
        ...state,
        error: action.payload.error
      };
    }

    default:
      return state;
  }
};
