import { takeEvery, put } from "redux-saga/effects";

import { makeChannel } from "../_helpers";

import { receivedForm } from '../../ducks/forms';

function* watchForForms(client) {
    
    const channel = makeChannel(client, {
        'dataform': (emit, msg) => {
            emit(msg);
        },
    });

    yield takeEvery(channel, function* eachForm(msg) {

        yield put(
            receivedForm({
                ...msg,
                time: (msg.delay && msg.delay.stamp) || new Date()
            })
        );

    });
}


// TODO discover available forms (fdp/template/XXXX)
// getItems from pubsub.localhost that have prefix above -> can then render name?


// TODO retrieve and display published forms (fdp/submitted/XXXX)
// subscribeToNode to get updates for the node!

// NEED TO SETUP AUTO-SUBSCRIPTION FOR FORM NODES!



// TODO how to forms being published relate to a MUC room!?


export default function*(client) {
  yield [watchForForms(client)];
}
