import { call, take, takeLatest, put } from "redux-saga/effects";
import forEach from "lodash/forEach";

import {
  SET_PRESENCE,
} from "../../ducks/user";


function* sendPresenceToRooms(client, rooms, presence) {
    rooms.forEach(function(room) {
        client.sendPresence({
            to: room,
            show: presence.value
        })
    });
}


function* setPresence(client) {

    yield takeLatest(SET_PRESENCE, function* setPresence(action) {

        // Update presence in all rooms we're connected to
        yield call(sendPresenceToRooms, client, Object.keys(action.payload.rooms), action.payload.presence);
        
        // Broadcast presence
        yield client.sendPresence({
            show: action.payload.presence.value
        });

    });

}

export default function*(client) {
  yield [setPresence(client)];
}
