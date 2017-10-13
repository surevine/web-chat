import uniqBy from "lodash/uniqBy";
import find from "lodash/find";
import filter from "lodash/filter";

import { makeConstant } from "./_helpers";

const constant = makeConstant("jchat/forms");

export const SUBSCRIBE_TO_FORMS = constant("SUBSCRIBE_TO_FORMS");
export const LOADED_FORM_NODES = constant("LOADED_FORM_NODES");
export const LOAD_FORM_TEMPLATES = constant("LOAD_FORM_TEMPLATES");

export const RECEIVED_FORM = constant("RECEIVED_FORM");
export const RECEIVED_FORM_TEMPLATE = constant("RECEIVED_FORM_TEMPLATE");

export const SUBMIT_FORM = constant("SUBMIT_FORM");

export const subscribeToFormNodes = () => ({
    type: SUBSCRIBE_TO_FORMS,
    payload: {}
});

export const loadedFormNodes = (templateNodes, submissionNodes) => ({
    type: LOADED_FORM_NODES,
    payload: {
        templateNodes,
        submissionNodes
    }
});

export const loadFormTemplates = () => ({
    type: LOAD_FORM_TEMPLATES,
    payload: {}
});

export const receivedForm = (form) => ({
  type: RECEIVED_FORM,
  payload: {
      form
  }
});

export const receivedFormTemplate = (node, template) => ({
type: RECEIVED_FORM_TEMPLATE,
payload: {
    node,
    template
}
});

export const submitForm = (node, form, jid) => ({
    type: SUBMIT_FORM,
    payload: {
        node,
        form,
        jid
    }
  });

const initialState = {
    nodes: {
        templateNodes: [],
        submissionNodes: []
    },
    templates: {}
};

// reducer
export default (state = initialState, action) => {
  switch (action.type) {

    case LOADED_FORM_NODES: {

        return {
            ...state,
            nodes: {
                templateNodes: action.payload.templateNodes,
                submissionNodes: action.payload.submissionNodes
            }
        };

    }

    case RECEIVED_FORM_TEMPLATE: {

        let currentTemplates = state.templates;

        return {
            ...state,
            templates: {
                ...currentTemplates,
                [action.payload.node]: action.payload.template
            }
        };

    }

    case RECEIVED_FORM: {

        // TODO check if delay, if so, ignore
        
        const form = action.payload.form;

        // Only process FDP nodes
        if(form.event.updated.node.indexOf('fdp/submitted') === -1) {
            console.log('skipping as not an FDP node');
            return;
        }

        // form.event.updated.published[0].id

        // TODO ensure field exists..
        const roomField = find(form.event.updated.published[0].form.fields, function(field) {
            return field.name === 'room';
        });

        // Only process if form has been sent to a particular room
        if(roomField) {

            const peerJid = roomField.value[0];
            const peer = state[peerJid] || {
                jid: peerJid,
                forms: []
            };

            let publisherField = find(form.event.updated.published[0].form.fields, function(field) {
                return field.name === 'userid';
            });

            // TODO refactor into helper
            const templateNode = form.event.updated.node.replace("fdp/submitted", "fdp/template");
    
            let newForm = {
                form: form.event.updated.published[0].form,
                id: form.event.updated.published[0].id,
                node: form.event.updated.node,
                template: state.templates[templateNode],
                from: publisherField.value[0]
            };

            if(state[peer.jid] && state[peer.jid].forms) {

                // TODO double check that publish time of form is newer
                let currentForms = filter(state[peer.jid].forms, function(form) {
                    return form.id !== newForm.id;
                });
                currentForms.push(newForm);

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
                        newForm
                        ]
                    }
                };
    
            }

        }

    }

    default:
      return state;
  }
};
