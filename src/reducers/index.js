import { combineReducers } from "redux";

import bookmarks from '../ducks/bookmarks';
import client from '../ducks/client';
import files from '../ducks/files';
import forms from '../ducks/forms';
import local from '../ducks/local';
import rooms from '../ducks/rooms';
import messages from '../ducks/messages';
import notification from '../ducks/notification';
import presence from '../ducks/presence';
import settings from '../ducks/settings';
import toast from '../ducks/toast';
import user from '../ducks/user';

export default combineReducers({
  bookmarks,
  client,
  files,
  forms,
  local,
  rooms,
  messages,
  notification,
  presence,
  settings,
  toast,
  user
});
