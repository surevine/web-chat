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

export const receivedFileMeta = (roomJid, id, meta) => ({
    type: RECEIVED_FILE_META,
    payload: { roomJid, id, meta }
});

const initialState = {};

// reducer
export default (state = initialState, action) => {
  switch (action.type) {

    case RECEIVED_FILE: 

        let newFile = {
            id: action.payload.id,
            content: action.payload.content
        };

        let room = state[action.payload.roomJid] || {
            jid: action.payload.roomJid,
            files: {}
        };

        if(state[room.jid] && state[room.jid].files) {

            let currentFiles = state[room.jid].files;

            return {
                ...state,
                [room.jid]: {
                    ...room,
                    files: {
                        ...currentFiles,
                        [newFile.id]: newFile
                    }
                }
            };

        }

        return {
            ...state,
            [room.jid]: {
                ...room,
                files: {
                    [newFile.id]: newFile
                }  
            }
        };

    case RECEIVED_FILE_META:
    
        let roomObj = state[action.payload.roomJid] || {
            jid: action.payload.roomJid,
            files: {}
        };

        let currentFiles = state[roomObj.jid].files;
        let fileContent = currentFiles[action.payload.id];

        if(!fileContent) {
            return state;
        }

        let augmentedObject = Object.assign(fileContent, action.payload.meta);

        return {
            ...state,
            [roomObj.jid]: {
                ...roomObj,
                files: {
                    ...currentFiles,
                    [action.payload.id]: augmentedObject
                }
            }
        };

    default:
      return state;
  }
};
