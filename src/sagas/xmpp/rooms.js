import { delay } from "redux-saga";
import { all, call, race, select, take, takeEvery, takeLatest, put } from "redux-saga/effects";

import { makeChannel } from "../_helpers";

import {
  JOIN_ROOM,
  LEAVE_ROOM,
  joinedRoom,
  leftRoom,
  failedJoinRoom,
  topicUpdated
} from "../../ducks/rooms";

function joinRoomWithOpts(client, roomJid, nickname, opts) {
  client.joinRoom(roomJid, nickname, {
    joinMuc: opts
  });
}

function* tryJoinRoom(client) {

  const errorChannel = makeChannel(client, {
    "muc:error": (emit, msg) => emit(msg),
  });

  const successChannel = makeChannel(client, {
    "muc:available": (emit, msg) => emit(msg),
  });

  yield takeLatest(JOIN_ROOM, function* joinRoom(action) {
    
      let joinOpts = {
        history: true,
      };
    
      if(action.payload.password && action.payload.password !== '') {
        joinOpts.password = action.payload.password
      }

      yield call(joinRoomWithOpts, client, action.payload.jid, action.payload.nickname, joinOpts);
    
      const result = yield race({
        success: take(successChannel),
        timeout: delay(5000),
        error: take(errorChannel)
      });
  
      if (result.timeout) {
        // TODO action to explain timeout + suggest retry
      }
  
      if (result.error) {
        yield put(failedJoinRoom(action.payload.jid, result.error.error));
      }
  
      if (result.success) {
  
        // Send current presence to room
        const presence = yield select((state) => state.user.presence);
        if(presence) {
          yield client.sendPresence({
              to: action.payload.jid,
              show: presence.value
          });
        }

        yield put(joinedRoom(action.payload.jid, action.payload.nickname));

      }

  });

}

function* leaveRoom(client) {
  
    yield takeLatest(LEAVE_ROOM, function* leaveRoom(action) {

      yield client.leaveRoom(action.payload.jid);
      yield put(leftRoom(action.payload.jid));

    });
  
}

function* watchForTopic(client) {
  
    const topicChannel = makeChannel(client, {
      'muc:subject': (emit, msg) => {
        emit(msg);
      },
    });
  
    yield takeEvery(topicChannel, function* eachMessage(msg) {
  
      if(msg.subject) {
          yield put(topicUpdated(msg));
      }
  
    });
}

export default function*(client) {
  yield all([tryJoinRoom(client), leaveRoom(client), watchForTopic(client)]);
}
