import { all, select, takeEvery, put } from "redux-saga/effects";
import find from 'lodash/find';
import shortid from 'shortid';

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
      
      const roomJid = presence.from.bare;
      const roomNickname = yield select((state) => {
        if(state.rooms[roomJid]) {
          return state.rooms[roomJid].nickname
        }
        return undefined;
      });

      // Ignore own presence messages
      if(roomNickname && (presence.from.resource !== roomNickname)) {

        const roomMembers = yield select(function(state) {
          let members = [];
          if(state.presence[roomJid] && state.presence[roomJid].members) {
            members = state.presence[roomJid].members;
          }
          return members;
        });
        
        let memberInRoom = find(roomMembers, function(member) {
          return member.resource === presence.from.resource;
        });

        // Don't show join message if member already in room
        if(!memberInRoom || presence.type !== 'available') {
          presence.id = shortid.generate();
          yield put(receivedMessage(presence));
        }

      }

      if(presence.type === 'available') {
          yield put(receivedPresenceAvailable(presence));
      } else if(presence.type === 'unavailable') {
          yield put(receivedPresenceUnavailable(presence));
      }

    return;

  });
}

export default function*(client) {
  yield all([watchForPresence(client)]);
}
