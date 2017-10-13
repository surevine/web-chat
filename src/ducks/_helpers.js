export const makeConstant = root => key => `${root}/${key}`;
export const makeAction = type => () => ({ type });