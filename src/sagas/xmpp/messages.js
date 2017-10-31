import { all, call, select, take, takeEvery, put } from "redux-saga/effects";
import shortid from "shortid";

import {
  receivedMessage,
  SEND_MESSAGE } from "../../ducks/messages";
import { incrementUnreadCount } from "../../ducks/rooms";
import { showNotification } from '../../ducks/notification';

import { makeChannel } from "../_helpers";

function* watchForMessages(client) {

  const messageChannel = makeChannel(client, {
    groupchat: (emit, msg) => {
      emit(msg);
    },
    'muc:subject': (emit, msg) => {
      msg.id = shortid.generate();
      emit(msg);
    }
  });

  yield takeEvery(messageChannel, function* eachMessage(msg) {

    // Skip delayed messages (for now)
    if(msg.delay) {
      return;
    }

    yield put(
      receivedMessage({
        ...msg,
        time: (msg.delay && msg.delay.stamp) || new Date(),
        direction: msg.to.bare === client.jid.bare ? "incoming" : "outgoing"
      })
    );

    yield put(incrementUnreadCount(msg.from.bare));

    yield call(createNotifications, msg);

  });
}

function* createNotifications(msg) {

  let settings = yield select((state) => state.settings);
  let currentNickname = yield select((state) => state.rooms[msg.from.bare].nickname);

  // Check username mention
  if(settings.userNotifications) {

    if(msg.from.resource !== currentNickname) {
      let room = yield select((state) => state.rooms[msg.from.bare]);
      if(msg.body.indexOf(room.nickname) > -1) {
        yield put(showNotification(msg.from.resource + ' mentioned you', msg.from.bare, msg.from.bare));
      }
    }

  }

  // Check if message contains any defined keywords
  if(settings.keywords.length > 0) {

    if(msg.from.resource !== currentNickname) {

      let keywords = yield select((state) => state.settings.keywords);

      let matchedWords = [];
      keywords.forEach((word) => {
        if(msg.body.indexOf(word.value) > -1) {
          matchedWords.push(word.value);
        }
      });
      if(matchedWords.length > 0) {
        yield put(showNotification(msg.from.resource + ' mentioned ' + matchedWords.join(), msg.from.bare, msg.from.bare));
      } 

    }

  } 

}

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
  yield all([watchForMessages(client), sendMessages(client)]);
}
