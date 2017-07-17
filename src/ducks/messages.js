import { makeConstant } from "./_helpers";

const constant = makeConstant("jchat/messages");

export const RECEIVED_MESSAGE = constant("RECEIVED_MESSAGE");

export const receivedMessage = msg => ({
  type: RECEIVED_MESSAGE,
  payload: msg
});

// TODO initial state

// reducer
export default (state = {}, action) => {
  switch (action.type) {

    case RECEIVED_MESSAGE: {

      const msg = action.payload;

      // TODO ensure its MUC etc

      // TODO maybe index by room
      // TODO handle the type of message (status etc)

      return [...state, msg];

    }

    default:
      return state;
  }
};
