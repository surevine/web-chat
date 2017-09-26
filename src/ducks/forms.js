import uniqBy from "lodash/uniqBy";
import { makeConstant } from "./_helpers";

const constant = makeConstant("jchat/forms");

// TODO understand how we will load forms - will it be all at once? one at a time?
export const RECEIVED_FORM = constant("RECEIVED_FORM");

export const LIST_FORMS = constant("LIST_FORMS");
export const GET_FORM_TEMPLATE = constant("GET_FORM_TEMPLATE");
export const SUBMIT_FORM = constant("SUBMIT_FORM");

export const receivedForm = (form) => ({
  type: RECEIVED_FORM,
  payload: {
      form
  }
});

export const listForms = () => ({
    type: GET_FORM_TEMPLATE,
    payload: {}
});

export const getFormTemplate = (node) => ({
    type: GET_FORM_TEMPLATE,
    payload: { node }
});

export const submitForm = (node, form) => ({
    type: SUBMIT_FORM,
    payload: {
        node,
        form
    }
  });

const initialState = {};

// reducer
export default (state = initialState, action) => {
  switch (action.type) {

    case RECEIVED_FORM: {
        
        const form = action.payload.form;
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
