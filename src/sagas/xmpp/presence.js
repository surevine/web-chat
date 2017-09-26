import { select, takeEvery, put } from "redux-saga/effects";
import md5 from "md5";
import find from 'lodash/find';

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
      // TODO ensure in state...
      const roomNickname = yield select(state => state.rooms[roomJid].nickname);
        
      // Ignore own presence messages
      if(presence.from.resource !== roomNickname) {

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
        if(memberInRoom && presence.type === 'available') {
          return;
        }

        // TODO fix this more properly
        presence.id = md5(presence.from.resource + new Date());
        yield put(receivedMessage(presence));

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
  yield [watchForPresence(client)];
}
