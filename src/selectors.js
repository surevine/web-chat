import findIndex from "lodash/findIndex";
import findKey from "lodash/findKey";
import find from "lodash/find";

export const getAuthenticated = state => state.client.authenticated;

export const getCurrentRoomJid = (state) => {

  let jid = findKey(state.rooms, function(room) {
    return room.isCurrent === true;
  });

  if(jid) {
    return jid;
  }
  
  return "";
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

export const getRoomForms = (state, { roomJid }) => {
  const forms = (state.forms[roomJid] && state.forms[roomJid].forms) || [];
  return forms;
};

export const getRoomFiles = (state, { roomJid }) => {
  const files = (state.files[roomJid] && state.files[roomJid].files) || [];
  return files;
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

export const getTemplateOptions = (state) => {

  let opts = [];

  Object.keys(state.forms.templates).forEach((node) => {
    if(state.forms.templates[node]) {
      opts.push({
        label: state.forms.templates[node].title,
        value: node
      })
    }
  });

  return opts;

}

export const getPublishedForm = (state, { formId }) => {

  let roomJid = getCurrentRoomJid(state);
  let form = find(state.forms[roomJid].forms, function(form) {
    return form.id === formId;
  });

  return form;

}

export const getPublishedFile = (state, { fileId }) => {
  
    let roomJid = getCurrentRoomJid(state);
    let file = find(state.files[roomJid].files, function(file) {
      return file.id === fileId;
    });
  
    return file;
  
  }

export const getKeywords = (state) => {

  let parsedKeywords = [];
  state.settings.keywords.forEach((keyword) => {
    parsedKeywords.push(keyword.value)
  });

  return parsedKeywords;

}