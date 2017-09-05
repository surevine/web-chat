import { spawn } from "redux-saga/effects";

import xmpp from "./xmpp/index.js";

function* rootSaga() {
  yield spawn(xmpp);
}

export default rootSaga;
