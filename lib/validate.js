'use strict';

// Validate additions to DB
/**
 * @param  {} input.name
 * @param  {} ;constid=parseInt(input.id
 * @param  {null} ;constobject={name
 * @param  {null};if(name} id
 */
const validate = input => {
  console.log(`Validating ${input}`)
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
    console.log(`${input} is valid!`)
    return object;
  } else {
  console.log(`${input} is NOT valid!`)
  return false;
}
};

module.exports = validate;
