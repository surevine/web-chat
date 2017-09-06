import { call, take, put } from "redux-saga/effects";

import {
  GET_BOOKMARKS,
  receivedBookmarks
} from "../../ducks/bookmarks";

function* getBookmarks(client) {

      yield take(GET_BOOKMARKS);

      const bookmarks = yield call([client, client.getBookmarks]);
      yield put(receivedBookmarks(bookmarks));

      return;

}

export default function*(client) {
  yield [getBookmarks(client)];
}
