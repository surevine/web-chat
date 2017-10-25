import { all } from "redux-saga/effects";

import setupClient from "./setupClient";

import auth from "./auth";
import bookmarks from './bookmarks';
import clientSaga from './client';
import files from './files';
import forms from './forms';
import rooms from './rooms';
import messages from './messages';
import presence from './presence';
import settings from './settings';
import user from './user';

function* runLoop(client) {
  let restarts = 0;

  while (true) {
    try {
        yield all([
            bookmarks(client),
            clientSaga(client),
            files(client),
            forms(client),
            rooms(client),
            messages(client),
            presence(client),
            user(client),
            settings()
        ]);
    } catch (e) {
      console.error("Caught error in saga, restarting:");
      console.error(e);
      restarts++;
      if (restarts > 10) {
        throw new Error("Already restarted 10 times");
      }
    }
  }
}

function* xmppSaga() {
  const client = setupClient();
  yield all([runLoop(client), auth(client)]);
}

export default xmppSaga;
