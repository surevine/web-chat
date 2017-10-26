import { all, takeLatest, put } from "redux-saga/effects";

import {
  APP_SETTINGS,
  LOAD_SETTINGS,
  SAVE_SETTINGS,
  saveSettings
} from "../../ducks/settings";

function* watchGetSettings() {
    yield takeLatest(LOAD_SETTINGS, function* fetchLocalSettings() {
        let localSettings = localStorage.getItem(APP_SETTINGS);
        if(localSettings) {
            yield put(saveSettings(JSON.parse(localSettings), true));
        }
    });
}

function* watchSaveSettings() {
    yield takeLatest(SAVE_SETTINGS, function localSaveSettings(action) {
        if(!action.payload.skipLocal) {
            localStorage.setItem(APP_SETTINGS, JSON.stringify(action.payload.settings));
        }
    });
}

export default function*() {
  yield all([watchGetSettings(), watchSaveSettings()]);
}
