const NS_SNIPPETS = "urn:xmpp:snippets:0";

export default (client, stanza) => {
    const Utils = stanza.utils;

    const Snippet = stanza.define({
      namespace: NS_SNIPPETS,
      element: "snippet",
      name: "snippet",
      fields: {
        mode: Utils.attribute("mode"),
        uri: Utils.textSub(NS_SNIPPETS, "uri"),
      }
    });

    const Metadata = stanza.define({
        namespace: NS_SNIPPETS,
        element: "metadata",
        name: "metadata",
        fields: {
            author: Utils.textSub(NS_SNIPPETS, "author"),
            name: Utils.textSub(NS_SNIPPETS, "name"),
            size: Utils.textSub(NS_SNIPPETS, "size"),
            type: Utils.textSub(NS_SNIPPETS, "type"),
            lastModified: Utils.textSub(NS_SNIPPETS, "lastModified")
        }
      });

    stanza.extendPubsubItem(Snippet);
    stanza.extendPubsubItem(Metadata);
    
  };