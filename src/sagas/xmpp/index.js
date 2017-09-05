import setupClient from "./setupClient";

import auth from "./auth";
import bookmarks from './bookmarks';
import clientSaga from './client';
import rooms from './rooms';
import messages from './messages';
import muc from './muc';

function* runLoop(client) {
  let restarts = 0;

  while (true) {
    try {
    //   yield [
    //     analytics(client),
    //     clientSaga(client),
    //     nodes(client),
        // discussions(client),
    //     subscriptions(client),
    //     newDiscussion(client),
    //     users(client),
    //     me(client),
    //     notifications(client),
    //     messages(client),
    //     mam(client),
    //     requests(client)
    //   ];
        yield [
            bookmarks(client),
            clientSaga(client),
            rooms(client),
            messages(client),
            muc(client),
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
