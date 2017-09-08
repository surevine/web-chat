import findIndex from "lodash/findIndex";

export const getAuthenticated = state => state.client.authenticated;

export const getRoomMessages = (state, { roomJid }) => {
  const messages = (state.messages[roomJid] && state.messages[roomJid].messages) || [];
  return messages;
};

export const isRoomBookmarked = (state, { roomJid }) => {

  let index = findIndex(state.bookmarks.conferences, function(bookmark) {
    return bookmark.jid.bare === roomJid;
  });

  if(index !== -1) {
    return true;
  }
  return false;

}