import { call, select, takeLatest } from "redux-saga/effects";
import forEach from "lodash/forEach";

import {
  SET_PRESENCE,
} from "../../ducks/user";


function* sendPresenceToRooms(client, rooms, presence) {


    // console.log('getting disco info!')
    // client.getDiscoInfo('pubsub.localhost', '').then(response => {
    //   console.log(response.discoInfo.identities);
    //   // TODO confirm that "urn:xmpp:fdp:0" is one of the identities type...

    // });
  
    // THIS IS HOW WE LOOK UP ROOMS!
    // console.log('getting disco items!')
    // client.getDiscoItems('pubsub.localhost', '').then(response => {
    //   console.log(response.discoItems.items);
    // });

    client.getItems('pubsub.localhost',"fdp/template/medivac", {
        max: 1
    }).then(response => {
        console.log(response.pubsub.retrieve.item.form)
    });

    // client.subscribeToNode("pubsub.localhost", "fdp/submitted/medivac").then(response => {
    //     console.log(response);
    // });

    // client.subscribeToNode("pubsub.localhost", "fdp/template/medivac").then(response => {
    //     console.log(response);
    // });

    // client.getItem('pubsub.localhost',"fdp/template/medivac", "2").then(response => {
    //     console.log(response)
    // });

    // client.publish('pubsub.localhost',"fdp/submitted/medivac", {
    //     json: {
    //         field1: 'testing',
    //         another: 'wow'
    //     }
    // }).then(response => {
    //     console.log(response)
    // })

    
    // rooms.forEach(function(room) {
    //     client.sendPresence({
    //         to: room,
    //         show: presence.value
    //     })
    // });
}


function* setPresence(client) {

    yield takeLatest(SET_PRESENCE, function* setPresence(action) {

        // Update presence in all rooms we're connected to
        const rooms = yield select(state => Object.keys(state.rooms));
        yield call(sendPresenceToRooms, client, rooms, action.payload.presence);
        
        // Broadcast presence
        yield client.sendPresence({
            show: action.payload.presence.value
        });

    });

}

export default function*(client) {
  yield [setPresence(client)];
}
