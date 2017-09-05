import { call, take, put } from "redux-saga/effects";

import {
  GET_BOOKMARKS,
  receivedBookmarks
} from "../../ducks/bookmarks";

function* getBookmarks(client) {

    while(true) {

        console.log('requesting bookmarks');

        const { payload } = yield take(GET_BOOKMARKS);

        const bookmarks = yield call([client, client.getBookmarks]);
        yield put(receivedBookmarks(bookmarks));

          
        //   (function(error, bookmarks) {

        //     console.log('in bookmark handlers')

        //     if(error) {
        //       console.log('received error', error);
        //     } else {
        //       console.log(bookmarks);
        //       put(receivedBookmarks(bookmarks));
        //     }

        // }));

    }

}

// TODO support joining multiple rooms...
export default function*(client) {
  yield [getBookmarks(client)];
}
