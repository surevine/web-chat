import { makeConstant } from "./_helpers";

const constant = makeConstant("jchat/messages");

export const RECEIVED_MESSAGE = constant("RECEIVED_MESSAGE");
export const SEND_MESSAGE = constant("SEND_MESSAGE");

export const receivedMessage = msg => ({
  type: RECEIVED_MESSAGE,
  payload: msg
});

export const sendMessage = msg => ({
  type: SEND_MESSAGE,
  payload: msg
});

// reducer
export default (state = {}, action) => {
  switch (action.type) {

    case RECEIVED_MESSAGE: {

      const msg = action.payload;
      const peerJid = msg.from.bare;
      const peer = state[peerJid] || {
        jid: peerJid,
        messages: []
      };

      // Skip initial presence messages delivered when joining room
      if(msg.type === "available") {
        return state;
      }

      return {
        ...state,
        [peer.jid]: {
          ...peer,
          messages: [
              ...peer.messages,
              msg
            ]
        }
      };

    }

    default:
      return state;
  }
};
