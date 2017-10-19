import { delay } from "redux-saga";
import { all, call, race, select, take, takeEvery, put } from "redux-saga/effects";
import find from "lodash/find";

import { SEND_FILE } from '../../ducks/files';

function* sendFile(client) {

    yield takeEvery(SEND_FILE, function* sendFile(action) {

        // spinnets/${chatroomjid}/content (datauri)
        //  ^ Publish this first, get item id, then use the id for the summary below...

        // snippets/${chatroomjid}/summary (json metadata?)

        console.log('in sendFile safa action', action.payload)

    });

}

export default function*(client) {
  yield [sendFile(client)];
}
