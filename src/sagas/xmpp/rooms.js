import { takeEvery, takeLatest, put } from "redux-saga/effects";

import { makeChannel } from "../_helpers";

import { topicUpdated } from "../../ducks/rooms";

import { addRecentRoom, getRecentRooms } from '../../localStorage';

import {
  JOIN_ROOM,
  JOINED_ROOM,
  joinedRoom,
  LEAVE_ROOM,
  LEFT_ROOM,
  leftRoom
} from "../../ducks/rooms";
import { currentRoom } from "../../ducks/rooms";
import { setRecentRooms } from "../../ducks/local";

function* joinRoom(client) {

  yield takeLatest(JOIN_ROOM, function* joinRoom(action) {

    // TODO joinRoom doesn't return result...
    yield client.joinRoom(action.payload.jid, action.payload.nickname);

    // TODO handle if not successful?
    yield put(joinedRoom(action.payload.jid, action.payload.nickname));

  });

}

function* leaveRoom(client) {
  
    yield takeLatest(LEAVE_ROOM, function* leaveRoom(action) {
  
      yield client.leaveRoom(action.payload.jid, action.payload.nickname);
  
      // TODO handle if not successful?
      yield put(leftRoom(action.payload.jid));
  
    });
  
  }

function* watchJoinedRoom(client) {

  yield takeLatest(JOINED_ROOM, function* storeRecentRoom(action) {

    let bareJid = action.payload.jid;

    addRecentRoom({
      jid: {
        bare: bareJid,
        local: bareJid.substr(0, bareJid.indexOf('@'))
      }
    });

    let recentRooms = getRecentRooms();
    yield put(setRecentRooms(recentRooms));

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
  yield [joinRoom(client), leaveRoom(client), watchJoinedRoom(client), watchForTopic(client)];
}
