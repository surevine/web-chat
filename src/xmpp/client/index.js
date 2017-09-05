export default client => {
  let isConnected = false;
  client.on("session:started", () => (isConnected = true));
  client.on("disconnected", () => (isConnected = false));

  // Logs unhandled errors from openfire
  // Can be overridden when handled by setting __handled = true on the stanza
  client.on("iq", stanza => {
    stanza.__handled = false;
    setTimeout(() => {
      if (stanza.error && !stanza.__handled) {
        console.error("Possibly unhandled stanza error", stanza.error, stanza);
      }
    }, 0);
  });

  client.withConnection = () => {
    if (isConnected) return Promise.resolve();

    return new Promise((resolve, reject) => {
      client.once("session:started", resolve);
    });
  };
};
