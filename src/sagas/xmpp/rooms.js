import { take, put } from "redux-saga/effects";

import {
  JOIN_ROOM,
  joinedRoom
} from "../../ducks/rooms";
import { currentRoom } from "../../ducks/muc";

function* joinRoom(client) {

    while(true) {

        const { payload } = yield take(JOIN_ROOM);

        // TODO HAVE THIS ON ACTION!
        let nickname = "JonnyHeaveyyy"

        // retrieve nickanme from somewhere... ACTION?!
        // TODO joinRoom doesn't return result...
        yield client.joinRoom(payload.jid, nickname);

        yield put(currentRoom(payload.jid, nickname));

        // TODO handle if not successful?
        yield put(joinedRoom(payload.jid));

    }

}

// TODO support joining multiple rooms...
export default function*(client) {
  yield [joinRoom(client)];
}
