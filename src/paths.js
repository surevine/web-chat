// orgs/$org
export const orgPath = org => `/orgs/${org}`;

// orgs/$org/nodes/$node
export const nodePath = (org, node) => `${orgPath(org)}/nodes/${node}`;

const optionalNodePath = (org, node) => (node ? nodePath(org, node) : orgPath(org));

// orgs/$org/discussions/new
// orgs/$org/nodes/$node/discussions/new
export const newDiscussionPath = (org, node) => `${optionalNodePath(org, node)}/discussions/new`;

// orgs/$org/discussions/$discussionId
// orgs/$org/nodes/$node/discussions/$discussionId
export const discussionPath = (org, node, discussionId) => {
  if (node && !discussionId) {
    discussionId = node;
    node = null;
  }

  return `${optionalNodePath(org, node)}/discussions/${discussionId}`;
};

export const messagePath = (org, node, discussionId, messageId) =>
  `${discussionPath(org, node, discussionId)}/message/${messageId}`;

export const topicsPath = org => `${orgPath(org)}/topics`;
export const adminPath = org => `${orgPath(org)}/admin`;
export const userPath = (org, jid) => `${orgPath(org)}/users/${jid}`;
export const userEditPath = () => `/profile/edit`;
