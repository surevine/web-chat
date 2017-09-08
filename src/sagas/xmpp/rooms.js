import { takeLatest, put } from "redux-saga/effects";

import {
  JOIN_ROOM,
  joinedRoom
} from "../../ducks/rooms";
import { currentRoom } from "../../ducks/muc";

function* joinRoom(client) {

  yield takeLatest(JOIN_ROOM, function* joinRoom(action) {

    // TODO joinRoom doesn't return result...
    yield client.joinRoom(action.payload.jid, action.payload.nickname);

    yield put(currentRoom(action.payload.jid, action.payload.nickname));

    // TODO handle if not successful?
    yield put(joinedRoom(action.payload.jid));

  });

}

// TODO support joining multiple rooms...
export default function*(client) {
  yield [joinRoom(client)];
}
