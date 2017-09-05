/* global Buffer */

// Deserialize a json object respecting objects which look like:
// `{ type: "Buffer", data: "123xyz" }`
// and turning them back into Buffer objects
//
// Useful for deserializing buffers from localStorage
function deserialize(text) {
  return JSON.parse(
    text,
    (key, value) =>
      value instanceof Object && value.type === "Buffer" ? new Buffer(value.data) : value
  );
}

export default deserialize;
