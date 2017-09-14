import { call, take, takeEvery, put } from "redux-saga/effects";
import md5 from "md5";

import {
  receivedMessage,
  SEND_MESSAGE } from "../../ducks/messages";
import { incrementUnreadCount } from "../../ducks/rooms";

import { makeChannel } from "../_helpers";

function* watchForMessages(client) {

  const channel = makeChannel(client, {
    chat: (emit, msg) => {
      emit(msg);
    },
    groupchat: (emit, msg) => {
      emit(msg);
    },
    'muc:subject': (emit, msg) => {
      // TODO resolve this more properly
      // add in msg id for rendering key
      msg.id = md5(msg.subject + msg.from.bare.toString() + msg.time);
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

    yield put(incrementUnreadCount(msg.from.bare));

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
