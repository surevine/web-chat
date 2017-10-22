import { all, call, select, takeLatest } from "redux-saga/effects";

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
        const rooms = yield select(state => Object.keys(state.rooms));
        yield call(sendPresenceToRooms, client, rooms, action.payload.presence);
        
        // Broadcast presence
        yield client.sendPresence({
            show: action.payload.presence.value
        });

    });

}

export default function*(client) {
  yield all([setPresence(client)]);
}
