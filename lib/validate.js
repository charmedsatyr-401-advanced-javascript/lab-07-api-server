'use strict';

const validate = input => {
  const name = String(input.name);
  const id = parseInt(input.id);

  const object = { name: null, id: null };
  if (name) {
    object.name = name;
  }
  if (id) {
    object.id = id;
  }
  if (object.name && object.id) {
    return object;
  }
  return false;
};

module.exports = validate;
