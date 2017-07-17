import { makeConstant } from "./_helpers";

const constant = makeConstant("jchat/muc");

export const JOIN_ROOM = constant("JOIN_ROOM");
export const TOPIC_UPDATED = constant("TOPIC_UPDATED");
export const PRESENCE_AVAILABLE = constant("PRESENCE_AVAILABLE");
export const PRESENCE_UNAVAILABLE = constant("PRESENCE_UNAVAILABLE");

export const joinRoom = jid => ({
  type: JOIN_ROOM,
  payload: jid
});

export const topicUpdated = message => ({
  type: TOPIC_UPDATED,
  payload: message
});

// TODO should this be combined into a single receivedPresence?!
export const receivedPresenceAvailable = presence => ({
  type: PRESENCE_AVAILABLE,
  payload: presence
});

export const receivedPresenceUnavailable = presence => ({
  type: PRESENCE_UNAVAILABLE,
  payload: presence
});

const initialState = {
    jid: "",
    topic: "",
    members: []
}

// reducer
export default (state = initialState, action) => {
  switch (action.type) {

    case JOIN_ROOM: {

        // TODO actually join the room here?!

        const jid = action.payload;

        return {
            ...state,
            jid: jid
        }

    }

    case TOPIC_UPDATED: {

        const message = action.payload;

        return {
            ...state,
            topic: message.subject
        }

    }

    case PRESENCE_AVAILABLE: {

        const presence = action.payload;

        return {
            ...state,
            members: [...state.members, { resource: presence.from.resource, role: presence.muc.role }]
        };
        
    }

    case PRESENCE_UNAVAILABLE: {

        const presence = action.payload;

        let currentMembers = state.members;
        let remainingMembers = currentMembers.filter((member) => {
            return member.resource !== presence.from.resource;
        });

        return {
            ...state,
            members: remainingMembers
        };

    }

    default:
      return state;
  }
};
