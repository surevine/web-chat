import { eventChannel, buffers } from "redux-saga";
import { actionChannel, take } from "redux-saga/effects";
import uuid from "uuid/v4";

export function* takeEverySerially(actionType, saga) {
  const channel = yield actionChannel(actionType, buffers.expanding(10));

  while (true) {
    const action = yield take(channel);
    yield saga(action);
  }
}

export function makeChannel(client, events) {
  return eventChannel(emitter => {
    const group = uuid();

    for (const eventName of Object.keys(events)) {
      client.on(eventName, group, (...args) => {
        events[eventName](emitter, ...args);
      });
    }

    return () => client.releaseGroup(group);
  });
}
