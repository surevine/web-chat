import { delay } from "redux-saga";
import { take, put, select, race, call } from "redux-saga/effects";

import {
  connected,
  disconnected,
  DISCONNECTED,
  CONNECTED,
  TRY_RECONNECT
} from "../../ducks/client";
import { getAuthenticated } from "../../selectors";

import { makeChannel } from "../_helpers";

const getDelay = attempts => (Math.pow(2, Math.min(attempts, 7)) - 1) * 500;

function* disconnectLoop(client) {
  let attempts = 0;

  while (true) {
    const wait = getDelay(attempts);

    console.warn(`XMPP Connection lost, retrying in ${wait}ms`);

    const result = yield race({
      connected: take(CONNECTED),
      timeout: delay(wait),
      tryNow: take(TRY_RECONNECT)
    });

    if (result.connected) return;
    if (result.timeout) {
      attempts++;
      yield call([client, client.connect]);
    }
    if (result.tryNow) {
      attempts = 0;
      yield call([client, client.connect]);
    }
  }
}

function* reconnectOnDrop(client) {
  while (true) {
    yield take(DISCONNECTED);
    if (yield select(getAuthenticated)) {
      yield disconnectLoop(client);
    }
  }
}

function* watchConnectionStatus(client) {
  const channel = makeChannel(client, {
    "session:started": emit => emit({ isConnected: true }),
    disconnected: emit => emit({ isConnected: false })
  });

  while (true) {
    const { isConnected } = yield take(channel);
    yield put(isConnected ? connected() : disconnected());
  }
}

export default function* connection(client) {
  yield [watchConnectionStatus(client), reconnectOnDrop(client)];
}
