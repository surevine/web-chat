import XMPP from 'stanza.io';

const Client = XMPP.createClient({
    sasl: ["scram-sha-1", "cram-md5", "digest-md5"],
    transport: "websocket",
    wsURL: "ws://localhost:7070/ws/"
});

Client.on('session:started', function () {
    Client.getRoster();
    Client.sendPresence();
});

// Client.on("raw:outgoing", console.log);
// Client.on("raw:incoming", console.log);

export default Client;