import { takeEvery, put } from "redux-saga/effects";

import { receivedPresenceAvailable, receivedPresenceUnavailable } from "../../ducks/presence";

import { makeChannel } from "../_helpers";

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
  yield [watchForPresence(client)];
}
