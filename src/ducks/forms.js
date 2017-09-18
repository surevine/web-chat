import uniqBy from "lodash/uniqBy";
import { makeConstant } from "./_helpers";

const constant = makeConstant("jchat/forms");

// TODO understand how we will load forms - will it be all at once? one at a time?
export const RECEIVED_FORM = constant("RECEIVED_FORM");

export const receivedForms = (jid, forms) => ({
  type: RECEIVED_FORM,
  payload: {
      jid,
      forms
  }
});

// TODO remove mock data
const initialState = {
    'whitesands@conference.localhost': {
        jid: 'whitesands@conference.localhost',
        forms: [
            { id: 123 },
            { id: 456 }
        ]
    }, 
    'second@conference.localhost': {
        jid: 'second@conference.localhost',
        forms: []
    }, 
}

// reducer
export default (state = initialState, action) => {
  switch (action.type) {

    case RECEIVED_FORM: {
        
        const form = action.payload;
        const peerJid = form.from.bare;
        const peer = state[peerJid] || {
        jid: peerJid,
        forms: []
        };

        if(state[peer.jid] && state[peer.jid].forms) {

            var currentForms = state[peer.jid].forms;
            currentForms.push(form);

            return {
                ...state,
                [peer.jid]: {
                ...peer,
                forms: uniqBy(currentForms, 'id')
                }
            };

        } else {

            return {
                ...state,
                [peer.jid]: {
                ...peer,
                forms: [
                    ...peer.forms,
                    form
                    ]
                }
            };

        }

    }

    default:
      return state;
  }
};
