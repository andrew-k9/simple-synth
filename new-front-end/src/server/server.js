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
 * ASYNC Function that makes an HTTP request and will pass the data to a callback.
 *
 * @param {string} routeName - route name _not_ starting w/ slash
 * @param {string} type - GET, POST, PATCH, DELETE
 * @param {Object} body - for POST and PATCH requests
 */
const request = ({routeName, type}, body={}) => {
  const header = { ...config(type)};

  if (Object.keys(body).length > 0){
    header.body = body;
  }

  console.log(header)

  return new Promise( (resolve, reject) => {
    fetch(`${SITE}/${routeName}`, header)
      .then( res => res.json() )
      .then( json => resolve(json))
      .catch( err => reject({err, header}));
  });
}