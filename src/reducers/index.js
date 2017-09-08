import { combineReducers } from "redux";

import bookmarks from '../ducks/bookmarks';
import client from '../ducks/client';
import rooms from '../ducks/rooms';
import messages from '../ducks/messages';
import muc from '../ducks/muc';
import user from '../ducks/user';

export default combineReducers({
  bookmarks,
  client,
  rooms,
  messages,
  muc,
  user
});
