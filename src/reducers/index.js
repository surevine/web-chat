import { combineReducers } from "redux";

import messages from "../ducks/messages";
import muc from "../ducks/muc";

export default combineReducers({
  messages,
  muc
});
