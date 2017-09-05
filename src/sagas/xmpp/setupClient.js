import XMPP from "stanza.io";
import configureClient from "../../xmpp";

function setupClient() {
  const client = XMPP.createClient({
    sasl: ["scram-sha-1", "cram-md5", "digest-md5"],
    ...window.config.xmpp
  });

  window.client = client;
  configureClient(client);

  client.on("session:started", () => {
    client.sendPresence();
  });

  // client.on("raw:incoming", console.log);

  return client;
}

export default setupClient;
