import XMPP from 'stanza.io';

    // jid: 'jonnyh@localhost',
    // password: 'password',

const Client = XMPP.createClient({
    sasl: ["scram-sha-1", "cram-md5", "digest-md5"],
    transport: "websocket",
    wsURL: "ws://localhost:7070/ws/"
});

Client.on('session:started', function () {

    console.log('SESSION STARTED!')

    Client.getRoster();
    Client.sendPresence();
});

// Client.on("raw:outgoing", console.log);
// Client.on("raw:incoming", console.log);

// client.on("*", (event, message) => console.log(event, message)); // log everything to the console

export default Client;