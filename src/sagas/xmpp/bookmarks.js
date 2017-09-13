import { call, take, takeLatest, put } from "redux-saga/effects";

import {
  ADD_BOOKMARK,
  REMOVE_BOOKMARK,
  GET_BOOKMARKS,
  receivedBookmarks
} from "../../ducks/bookmarks";

function* fetchBookmarks(client) {

  const bookmarks = yield call([client, client.getBookmarks]);

  yield put(receivedBookmarks(bookmarks));

  return;

}

function* watchGetBookmarks(client) {
    yield takeLatest(GET_BOOKMARKS, fetchBookmarks, client);
}

function* addBookmark(client) {
  while(true) {
    const { payload } = yield take(ADD_BOOKMARK);
    yield call([client, client.addBookmark], {
      jid: payload
    });
  
    yield fetchBookmarks(client);
  }
}

function* removeBookmark(client) {
  while(true) {
    const { payload } = yield take(REMOVE_BOOKMARK);
    yield call([client, client.removeBookmark], payload);

    yield fetchBookmarks(client);
  }
}

export default function*(client) {
  yield [watchGetBookmarks(client), addBookmark(client), removeBookmark(client)];
}
