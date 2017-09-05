import { call, take, takeEvery, put } from "redux-saga/effects";

import {
  receivedMessage,
  SEND_MESSAGE } from "../../ducks/messages";

import { makeChannel } from "../_helpers";

function* watchForMessages(client) {

  const channel = makeChannel(client, {
    chat: (emit, msg) => {
      emit(msg);
    },
    groupchat: (emit, msg) => {
      emit(msg);
    }
  });

  yield takeEvery(channel, function* eachMessage(msg) {
    yield put(
      receivedMessage({
        ...msg,
        time: (msg.delay && msg.delay.stamp) || new Date(),
        from: msg.from,
        to: msg.to,
        anonymous: msg.anonymous,
        direction: msg.to.bare === client.jid.bare ? "incoming" : "outgoing",
        room: msg.type === "groupchat"
      })
    );

    // Scroll message pane to bottom
    // scrollMessageList();

  });
}

// function scrollMessageList() {
//   console.log('going to scroll!')
//   var messageList = document.getElementById('messageList');
//   messageList.scrollTop = messageList.scrollHeight;
// }

function* sendMessages(client) {
  while (true) {
    const { payload } = yield take(SEND_MESSAGE);

    try {
      yield call([client, client.sendMessage], payload);
    } catch (e) {
      console.error("Could not send message", e);
    }
  }
}

export default function*(client) {
  yield [watchForMessages(client), sendMessages(client)];
}
