const SITE = 'http://127.0.0.1:3000';

const config = (type) => {
  return {
    method: type,
    headers: {
      "Content-Type": "application/json"
    }
  }
}

/**
 * Function that makes an HTTP request and will pass the data to a callback
 *
 * @param {string} routeName - route name _not_ starting w/ slash
 * @param {string} type - GET, POST, PATCH, DELETE
 * @param {requestCallback} callback - callback that takes the JSON object as an argument
 * @param {Object} body - for POST and PATCH requests
 */
const req = ({routeName, type, callback}, body={}) => {
  const header = { ...config(type)};
  if (Object.keys(body).length > 0){
    header.body = body;
  }

  // console.log({ header, site, routeName, callback})
  fetch(`${SITE}/${routeName}`, header)
    .then( res => res.json() )
    .then( json => callback(json) )
    .catch( err => console.log({err, header, routeName, callback}));
}