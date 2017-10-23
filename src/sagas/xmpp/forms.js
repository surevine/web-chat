import { delay } from "redux-saga";
import { all, call, race, select, take, takeEvery, put } from "redux-saga/effects";
import find from "lodash/find";

import { makeChannel } from "../_helpers";
import { getFormField } from '../../forms';

import { receivedForm, 
        loadedFormNodes,
        receivedFormTemplate,
        SUBSCRIBE_TO_FORMS,
        SUBMIT_FORM } from '../../ducks/forms';
import { showNotification } from '../../ducks/notification';
import { showToast } from '../../ducks/toast';

function* fetchFormNodes(client) {

    const allNodes = yield call([client, client.getDiscoItems], 'pubsub.'+window.config.xmppDomain, '');

    let templateNodes = [];
    let submissionNodes = [];

    allNodes.discoItems.items.forEach((node) => {
        if(node.node.startsWith('fdp/template')) {
            templateNodes.push(node.node);
            return;
        }
        if(node.node.startsWith('fdp/submitted')) {
            submissionNodes.push(node.node);
            return;
        }
    });

    yield put(loadedFormNodes(templateNodes, submissionNodes));
}

function* fetchSubscriptions(client) {
    const response = yield call([client, client.getSubscriptions], 'pubsub.'+window.config.xmppDomain);
    return response.pubsub.subscriptions.list;
}

function* subscribeToFormNodes(client) {

    yield take(SUBSCRIBE_TO_FORMS);

    yield fetchFormNodes(client);

    const subscriptions = yield fetchSubscriptions(client);

    const submissionNodes = yield select(state => state.forms.nodes.submissionNodes);
    const userJid = yield select(state => state.client.jid.bare);


    // TODO change to yield all
    submissionNodes.forEach((node) => {

        let found = find(subscriptions, function(sub) {
            return sub.node === node;
        });

        if(!found) {
            client.subscribeToNode('pubsub.'+window.config.xmppDomain, {
                node: node,
                jid: userJid
            });
        }

    });

    yield call(loadFormTemplates, client);
}

function* loadFormTemplates(client) {
    const templateNodes = yield select(state => state.forms.nodes.templateNodes);
    yield all(templateNodes.map(node => call(loadTemplate, client, node)));
}

function* loadTemplate(client, node) {
    let response = yield call([client, client.getItems], 'pubsub.'+window.config.xmppDomain, node, { max: 1 });
    yield put(receivedFormTemplate(node, response.pubsub.retrieve.item.form));
}

function* watchForForms(client) {
    
    const channel = makeChannel(client, {
        "pubsub:event": (emit, msg) => {
            emit(msg);
        }
    });

    yield takeEvery(channel, function* eachForm(msg) {

        if(!msg.event.updated.node.startsWith('fdp/submitted')) {
            return;
        }

        yield put(receivedForm(msg));

        let settings = yield select((state) => state.settings);
        if(settings.formNotifications) {

            let form = msg.event.updated.published[0].form;

            let template = yield select(state => state.forms.templates[msg.event.updated.node.replace("fdp/submitted", "fdp/template")]);
            let author = getFormField(form, 'userid').value;
            let room = getFormField(form, 'room').value;

            yield put(showNotification(author + ' published ' + template.title, room));
        }

    });
}

// TODO move this elsewhere
function buildFormMessage(formData, template, node, formId) {

    // TODO replace / remove below when form id delivered
    // BUILD hyperlink consistent with exisintg jchat client
    let message = "<a href='jchat://pubsub.localhost?select-form" + 
                    "&node=" + node.replace("fdp/submitted/", "") + 
                    "&id=" + formId + "'>" + 
                    "===== " + template.title + " =====</a>\n\n";
    
    formData.fields.forEach((field) => {
        if(field.type === "hidden") {
            return;
        }
        message += (field.label + " " + field.value + "\n");
    });
    return message;
}

function* publishForm(client) {

    const successChannel = makeChannel(client, {
        "pubsub:event": (emit, msg) => emit(msg),
    });

    yield takeEvery(SUBMIT_FORM, function* submitForm(action) {

        let formData = {
            type: 'submit',
            fields: action.payload.form
        };

        yield call([client, client.publish], 
            'pubsub.'+window.config.xmppDomain, 
            action.payload.node, 
            { form: formData }
        );

        const result = yield race({
            success: take(successChannel),
            timeout: delay(5000)
        });
      
        if (result.timeout) {
        // TODO action to explain timeout + suggest retry
        }

        if(result.success) {

            let publishedForm = result.success.event.updated.published[0];
            let template = yield select(state => state.forms.templates[action.payload.node.replace("fdp/submitted", "fdp/template")]);

            yield call([client, client.sendMessage], {
                to: action.payload.jid,
                type: 'groupchat',
                body: buildFormMessage(formData, template, action.payload.node, publishedForm.id),
                form: publishedForm.form
            });

            yield put(showToast('Form published successfully', 'info'));

        }

    });

}

export default function*(client) {
  yield all([watchForForms(client), subscribeToFormNodes(client), publishForm(client)]);
}
