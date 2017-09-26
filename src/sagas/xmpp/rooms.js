import { takeEvery, takeLatest, put } from "redux-saga/effects";

import { makeChannel } from "../_helpers";
import { addRecentRoom, getRecentRooms } from '../../localStorage';

import {
  JOIN_ROOM,
  JOINED_ROOM,
  joinedRoom,
  LEAVE_ROOM,
  leftRoom,
  topicUpdated
} from "../../ducks/rooms";
import { setRecentRooms } from "../../ducks/local";


    // THIS IS HOW WE LOOK UP ROOMS!
    // client.getDiscoItems('conference.localhost', '').then(response => {
    //   console.log(response.discoItems);
    // });

function* joinRoom(client) {

  yield takeLatest(JOIN_ROOM, function* joinRoom(action) {

    yield client.joinRoom(action.payload.jid, action.payload.nickname, {
      joinMuc: {
        history: true
      }
    });

  //   client.joinRoom('room@muc.example.com', 'User', {
  //     status: 'This will be my status in the MUC',
  //     joinMuc: {
  //         password: 'hunter2',
  //         history: {
  //             maxstanzas: 20
  //         }
  //     }
  // });

    // TODO handle if not successful?
    yield put(joinedRoom(action.payload.jid, action.payload.nickname));

  });

}

function* leaveRoom(client) {
  
    yield takeLatest(LEAVE_ROOM, function* leaveRoom(action) {
  
      yield client.leaveRoom(action.payload.jid);
  
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

// TODO support joining multiple rooms...
export default function*(client) {
  yield [joinRoom(client), leaveRoom(client), watchJoinedRoom(client), watchForTopic(client)];
}
