export const getAuthenticated = state => state.client.authenticated;

export const getRoomMessages = (state, { roomJid }) => {
  const messages = (state.messages[roomJid] && state.messages[roomJid].messages) || [];
  return messages;
};
