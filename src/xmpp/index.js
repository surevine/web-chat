import Client from "./client";
import Snippets from './snippets';

export default function configureClient(client) {
  
  client.use(Client);
  client.use(Snippets);

  return client;
}
