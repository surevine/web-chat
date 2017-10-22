import { call, select, take, takeEvery, put } from "redux-saga/effects";
import shortid from "shortid";

import {
  receivedMessage,
  SEND_MESSAGE } from "../../ducks/messages";
import { incrementUnreadCount } from "../../ducks/rooms";
import { showNotification } from '../../ducks/notification';

import { makeChannel } from "../_helpers";

function* watchForMessages(client) {

  const messageChannel = makeChannel(client, {
    chat: (emit, msg) => {
      emit(msg);
    },
    groupchat: (emit, msg) => {
      emit(msg);
    },
    'muc:subject': (emit, msg) => {
      msg.id = shortid.generate();
      emit(msg);
    },
    // 'chat:state': (emit, msg) => {
    //   // console.log('CHAT STATE', msg)
    //   // TODO outbound as below:
    //   // client.sendMessage({ to: 'peer@example.com', type: 'chat', chatState: 'composing' })
    // },
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

    // Scroll message pane to bottom
    // scrollMessageList();

  });
}

function* createNotifications(msg) {

  let settings = yield select((state) => state.settings);

  // Check username mention
  if(settings.userNotifications) {
    let room = yield select((state) => state.rooms[msg.from.bare]);
    if(msg.body.indexOf(room.nickname) > -1) {
      yield put(showNotification(msg.from.resource + ' mentioned you', msg.from.bare));
    }
  }

  // Check if message contains any defined keywords
  if(settings.keywords.length > 0) {
    let keywords = yield select((state) => state.settings.keywords);
    let matchedWords = [];
    keywords.forEach((word) => {
      if(msg.body.indexOf(word) > -1) {
        matchedWords.push(word);
      }
    });
    if(matchedWords.length > 0) {
      yield put(showNotification(msg.from.resource + ' mentioned ' + matchedWords.join(), msg.from.bare));
    } 
  } 

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
