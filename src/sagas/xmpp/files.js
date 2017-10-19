import { takeEvery } from "redux-saga/effects";

import { SEND_FILE } from '../../ducks/files';

function* sendFile(client) {

    yield takeEvery(SEND_FILE, function* sendFile(action) {

        // spinnets/${chatroomjid}/content (datauri)
        //  ^ Publish this first, get item id, then use the id for the summary below...

        // snippets/${chatroomjid}/summary (json metadata?)

        console.log('in sendFile safa action', action.payload);

    });

}

export default function*(client) {
  yield [sendFile(client)];
}
