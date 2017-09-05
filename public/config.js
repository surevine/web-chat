(function () {
  // change me if required
//   var loginDomain = localStorage.getItem("xmppDomain") || "localhost";

//   var https = loginDomain.match(/\.threatvine\.com/);
//   var wsURL = [https ? "wss" : "ws", "://", loginDomain, https ? "" : ":7070", "/ws/"].join("");

  var loginDomain = 'localhost';
  var wsURL = "ws://localhost:7070/ws/";

  window.config = {
    xmpp: {
      transport: "websocket",
      wsURL: wsURL
    },
    xmppDomain: loginDomain
  };
})();
