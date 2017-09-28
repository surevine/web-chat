import { delay } from "redux-saga";
import { take, put, call, spawn, race } from "redux-saga/effects";

import history from '../../history';

import {
  LOGOUT,
  LOGIN,
  CONNECTED,
  authFailure,
  AUTH_ERRORS,
  authenticated
} from "../../ducks/client";
import { getBookmarks } from "../../ducks/bookmarks";
import { subscribeToFormNodes } from "../../ducks/forms";
import deserializeWithBuffers from "../../lib/deserialize-with-buffers";

import { makeChannel } from "../_helpers";

function connectWithCredentials(client, creds) {
  // stanza doesn't properly clear credentials, seems to be a bug
  client.config.credentials = {};
  client.connect(creds);
}

function* tryConnect(client, initialCredentials) {

  const errorChannel = makeChannel(client, {
    "auth:failed": (emit, msg) => emit(AUTH_ERRORS.CREDENTIALS)
  });

  while (true) {
    let creds;
    let saveOnSuccess = false;

    // try initial once
    if (initialCredentials) {
      creds = initialCredentials;
      initialCredentials = null;
    } else {
      const { payload } = yield take(LOGIN);
      creds = payload;
      saveOnSuccess = true;
    }

    yield call(connectWithCredentials, client, creds);

    const result = yield race({
      success: take(CONNECTED),
      timeout: delay(5000),
      error: take(errorChannel)
    });

    if (result.timeout) {
      yield put(authFailure(AUTH_ERRORS.CERTIFICATE));
      initialCredentials = creds;
    }

    if (result.error) {
      yield put(authFailure(result.error));
    }

    if (result.success) {

      yield put(authenticated(client.jid));
      errorChannel.close();

      // Bootstrap other XMPP actions once logged in
      // 
      yield put(subscribeToFormNodes());
      yield put(getBookmarks());

      if (saveOnSuccess) {
        yield call(saveLoginDetails, client);
      }
      yield call(redirectOnLogin, client);
      return;
    }
  }
}

function redirectOnLogin(client) {
    history.push("/");
}

function* logout(client) {
  yield take(LOGOUT);
  sessionStorage.removeItem("jid");
  sessionStorage.removeItem("credentials");
  window.location = "/";
}

function getSavedLogin() {
  const { jid, credentials } = window.sessionStorage;

  if (jid && credentials) {
    return { jid, credentials: deserializeWithBuffers(credentials) };
  }
  return null;
}

function saveLoginDetails(client) {
  const jid = client.jid;
  const { salt, serverKey, clientKey, saltedPassword } = client.config.credentials;

  sessionStorage.setItem("jid", jid.bare);
  sessionStorage.setItem(
    "credentials",
    JSON.stringify({
      username: jid.local,
      salt,
      serverKey,
      clientKey,
      saltedPassword
    })
  );
}

export default function* authSaga(client) {
    
  const savedCreds = yield call(getSavedLogin);

  yield call(tryConnect, client, savedCreds);

  window.client = client;

  yield spawn(logout, client);

  return client;
}
