import { all, call, takeEvery, takeLatest, put } from "redux-saga/effects";

import {
  ADD_BOOKMARK,
  REMOVE_BOOKMARK,
  GET_BOOKMARKS,
  receivedBookmarks
} from "../../ducks/bookmarks";

function* fetchBookmarks(client) {

  const bookmarks = yield call([client, client.getBookmarks]);

  yield put(receivedBookmarks(bookmarks));

}

function* watchGetBookmarks(client) {
    yield takeLatest(GET_BOOKMARKS, fetchBookmarks, client);
}

function* addBookmark(client) {

  yield takeEvery(ADD_BOOKMARK, function* eachBookmark(action) {
    yield call([client, client.addBookmark], { jid: action.payload });
    yield fetchBookmarks(client);
  });

}

function* removeBookmark(client) {

  yield takeEvery(REMOVE_BOOKMARK, function* eachBookmark(action) {
      yield call([client, client.removeBookmark], action.payload);
      yield fetchBookmarks(client);
  });

}

export default function*(client) {
  yield all([watchGetBookmarks(client), addBookmark(client), removeBookmark(client)]);
}
