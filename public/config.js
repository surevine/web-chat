(function () {

  var loginDomain = 'localhost';
  var wsURL = "ws://localhost:7070/ws/";

  window.config = {
    xmpp: {
      transport: "websocket",
      wsURL: wsURL
    },
    xmppDomain: loginDomain,
  };
  
})();
