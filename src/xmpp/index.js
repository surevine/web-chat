// import Mix from "stanza-xep-0369";
import Client from "./client";
// import Logging from "./logging";
// import Discussions from "./discussions";
// import SecurityLabels from "./security-labels";
// import TVXSecurityLabel from "./tvx-security-label";
// import Topics from "./topics-pubsub";
// import References from "./references";
// import Anonymity from "./anonymity";

export default function configureClient(client) {
//   client.use(Mix);

  client.use(Client);
//   client.use(SecurityLabels);
//   client.use(References);
//   client.use(TVXSecurityLabel);
//   client.use(Logging);
//   client.use(Topics);
//   client.use(Discussions);
//   client.use(Anonymity);

  return client;
}
