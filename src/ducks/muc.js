import orderBy from "lodash/orderBy";
import differenceBy from "lodash/differenceBy";

import { makeConstant } from "./_helpers";

const constant = makeConstant("jchat/muc");

export const CURRENT_ROOM = constant("CURRENT_ROOM");
export const TOPIC_UPDATED = constant("TOPIC_UPDATED");
export const PRESENCE_AVAILABLE = constant("PRESENCE_AVAILABLE");
export const PRESENCE_UNAVAILABLE = constant("PRESENCE_UNAVAILABLE");

// TODO rework this to be under rooms...
// TODO showRoom
export const currentRoom = (jid, nickname) => ({
    type: CURRENT_ROOM,
    payload: {
        jid,
        nickname
    }
});

export const topicUpdated = message => ({
  type: TOPIC_UPDATED,
  payload: message
});

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
    title: "",
    topic: "",
    nickname: "",
    members: []
}

// reducer
export default (state = initialState, action) => {
  switch (action.type) {

    case CURRENT_ROOM: {

        // TODO parse out title

        return {
            ...state,
            jid: action.payload.jid,
            nickname: action.payload.nickname
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

        let show = presence.type;
        if(presence.show) {
            show = presence.show
        }

        let status = "";
        if(presence.status) {
            status = presence.status;
        }

        var roomMembers = differenceBy(state.members, [{ 'resource': presence.from.resource }], 'resource');

        roomMembers.push({
            resource: presence.from.resource, 
            role: presence.muc.role,
            presence: show,
            status: status
        });

        return {
            ...state,
            members: orderBy(roomMembers, ['resource'], ['asc'])
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
