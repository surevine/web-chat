import orderBy from "lodash/orderBy";
import differenceBy from "lodash/differenceBy";

import { makeConstant } from "./_helpers";

const constant = makeConstant("jchat/presence");

export const PRESENCE_AVAILABLE = constant("PRESENCE_AVAILABLE");
export const PRESENCE_UNAVAILABLE = constant("PRESENCE_UNAVAILABLE");

export const receivedPresenceAvailable = presence => ({
  type: PRESENCE_AVAILABLE,
  payload: presence
});

export const receivedPresenceUnavailable = presence => ({
  type: PRESENCE_UNAVAILABLE,
  payload: presence
});

const initialState = {}

// reducer
export default (state = initialState, action) => {
  switch (action.type) {

    case PRESENCE_AVAILABLE: {

        const presence = action.payload;
        const peerJid = presence.from.bare;
        const peer = state[peerJid] || {
            jid: peerJid,
            members: []
        };

        let show = presence.type;
        if(presence.show) {
            show = presence.show
        }

        let status = "";
        if(presence.status) {
            status = presence.status;
        }


        if(state[peer.jid] && state[peer.jid].members) {

            var currentMembers = differenceBy(state[peer.jid].members, [{ 'resource': presence.from.resource }], 'resource');

            currentMembers.push({
                resource: presence.from.resource, 
                role: presence.muc.role,
                presence: show,
                status: status
            });

            return {
                ...state,
                [peer.jid]: {
                ...peer,
                members: orderBy(currentMembers, ['resource'], ['asc'])
                }
            };

        } else {

            return {
                ...state,
                [peer.jid]: {
                ...peer,
                members: [
                    ...peer.members,
                    {
                        resource: presence.from.resource, 
                        role: presence.muc.role,
                        presence: show,
                        status: status
                    }
                ]}
            };

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
        const peerJid = presence.from.bare;
        const peer = state[peerJid];

        // TODO ensure collection exists...
        let currentMembers = peer.members;
        
        let remainingMembers = currentMembers.filter((member) => {
            return member.resource !== presence.from.resource;
        });

        return {
            ...state,
            [peer.jid]: {
                ...peer,
                members: remainingMembers
            }
        };

    }

    default:
      return state;
  }
};
