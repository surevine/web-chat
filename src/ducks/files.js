import { makeConstant } from "./_helpers";

const constant = makeConstant("jchat/files");

export const SEND_FILE = constant("SEND_FILE");
export const RECEIVED_FILE = constant("RECEIVED_FILE");

export const sendFile = (roomJid, content, meta) => ({
    type: SEND_FILE,
    payload: { roomJid, content, meta }
});

// TODO need to have actions to received file (published to known prefix like forms)

const initialState = {};

// reducer
export default (state = initialState, action) => {
  switch (action.type) {

    case RECEIVED_FILE: 

        // TODO store files indexed by roomJid like forms

    break;

    default:
      return state;
  }
};
