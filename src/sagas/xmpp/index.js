import setupClient from "./setupClient";

import auth from "./auth";
import bookmarks from './bookmarks';
import clientSaga from './client';
import files from './files';
import forms from './forms';
import rooms from './rooms';
import messages from './messages';
import presence from './presence';
import user from './user';

function* runLoop(client) {
  let restarts = 0;

  while (true) {
    try {
        yield [
            bookmarks(client),
            clientSaga(client),
            files(client),
            forms(client),
            rooms(client),
            messages(client),
            presence(client),
            user(client)
        ]
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
  yield [runLoop(client), auth(client)];
}

export default xmppSaga;
