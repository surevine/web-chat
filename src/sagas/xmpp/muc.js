import { takeEvery, put } from "redux-saga/effects";

import { topicUpdated, receivedPresenceAvailable, receivedPresenceUnavailable } from "../../ducks/muc";

import { makeChannel } from "../_helpers";

function* watchForTopic(client) {

  const channel = makeChannel(client, {
    message: (emit, msg) => {
      emit(msg);
    },
  });

  yield takeEvery(channel, function* eachMessage(msg) {

    if(msg.subject) {
        yield put(topicUpdated(msg));
    }

  });
}

function* watchForPresence(client) {

  const channel = makeChannel(client, {
    "muc:available": (emit, msg) => {
      emit(msg);
    },
    "muc:unavailable": (emit, msg) => {
      emit(msg);
    },
  });

  yield takeEvery(channel, function* eachMessage(presence) {

    if(presence.type === 'available') {
        yield put(receivedPresenceAvailable(presence));
        return;
    }

    if(presence.type === 'unavailable') {
        yield put(receivedPresenceUnavailable(presence));
        return;
    }

  });
}

export default function*(client) {
  yield [watchForTopic(client), watchForPresence(client)];
}
