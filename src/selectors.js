import findIndex from "lodash/findIndex";

export const getAuthenticated = state => state.client.authenticated;

export const getCurrentRoomJid = (state) => {

  let index = findIndex(state.rooms, function(room) {
    return room.isCurrent === true;
  });

  if(state.rooms[index]) {
    return state.rooms[index].jid;
  } else {
    return "";
  }

}

export const getRoomInfo = (state, { roomJid }) => {
  const info = (state.rooms[roomJid]) || {};
  return info;
};

export const getRoomMessages = (state, { roomJid }) => {
  const messages = (state.messages[roomJid] && state.messages[roomJid].messages) || [];
  return messages;
};

export const getRoomMembers = (state, { roomJid }) => {
  const members = (state.presence[roomJid] && state.presence[roomJid].members) || [];
  return members;
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