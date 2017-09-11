import { takeEvery, takeLatest, put } from "redux-saga/effects";

import { makeChannel } from "../_helpers";

import { topicUpdated } from "../../ducks/rooms";

import {
  JOIN_ROOM,
  joinedRoom
} from "../../ducks/rooms";
import { currentRoom } from "../../ducks/rooms";

function* joinRoom(client) {

  yield takeLatest(JOIN_ROOM, function* joinRoom(action) {

    // TODO joinRoom doesn't return result...
    yield client.joinRoom(action.payload.jid, action.payload.nickname);

    // yield put(currentRoom(action.payload.jid, action.payload.nickname));

    // TODO handle if not successful?
    yield put(joinedRoom(action.payload.jid));

  });

}

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

// TODO support joining multiple rooms...
export default function*(client) {
  yield [joinRoom(client), watchForTopic(client)];
}
