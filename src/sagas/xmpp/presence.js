import { takeEvery, put } from "redux-saga/effects";
import md5 from "md5";

import { receivedPresenceAvailable, receivedPresenceUnavailable } from "../../ducks/presence";
import { receivedMessage } from "../../ducks/messages";

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
    } else if(presence.type === 'unavailable') {
        yield put(receivedPresenceUnavailable(presence));
    }

    // TODO ignore own presences for messages
    // TODO fix this more properly
    // console.log(presence)
    presence.id = md5(presence.from.resource + new Date());
    yield put(receivedMessage(presence));
    return;

  });
}

export default function*(client) {
  yield [watchForPresence(client)];
}
