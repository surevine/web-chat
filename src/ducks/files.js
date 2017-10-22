import uniqBy from "lodash/uniqBy";
import find from "lodash/find";
import filter from "lodash/filter";

import { makeConstant } from "./_helpers";

const constant = makeConstant("jchat/files");

export const SEND_FILE = constant("SEND_FILE");
export const RECEIVED_FILE = constant("RECEIVED_FILE");
export const RECEIVED_FILE_META = constant("RECEIVED_FILE_META");

export const sendFile = (roomJid, content, meta) => ({
    type: SEND_FILE,
    payload: { roomJid, content, meta }
});

export const receivedFile = (roomJid, id, content) => ({
    type: RECEIVED_FILE,
    payload: { roomJid, id, content }
});

export const receivedFileMeta = (roomJid, fileId, meta) => ({
    type: RECEIVED_FILE_META,
    payload: { roomJid, fileId, meta }
});

const initialState = {};

// reducer
export default (state = initialState, action) => {
  switch (action.type) {

    case RECEIVED_FILE: 

        // TODO store files indexed by roomJid like forms

        console.log('IN RECEIVED FILE REDUCER', action.payload);

        let newFile = {
            id: action.payload.id,
            content: action.payload.content
        };

        const room = state[action.payload.roomJid] || {
            jid: action.payload.roomJid,
            files: []
        };

        if(state[room.jid] && state[room.jid].files) {

            let currentFiles = filter(state[room.jid].files, function(file) {
                return file.id !== newFile.id;
            });
            currentFiles.push(newFile);

            return {
                ...state,
                [room.jid]: {
                    ...room,
                    files: uniqBy(currentFiles, 'id')
                }
            };

        } else {

            return {
                ...state,
                [room.jid]: {
                ...room,
                files: [
                    ...room.files,
                    newFile
                    ]
                }
            };

        }
            

        return state;

    break;

    case RECEIVED_FILE_META: 
    
            // TODO store meta for the file
            return state;
    
        break;

    default:
      return state;
  }
};
