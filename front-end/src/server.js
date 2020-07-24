const SITE = 'http://127.0.0.1:3000';

const config = (type) => {
  return {
    method: type,
    headers: {
      "Content-Type": "application/json"
    }
  }
}

const req = ({routeName, type, callback}, body={}) => {
  const header = {
    ...config(type),
    body
  };

  fetch(`${SITE}/${routeName}`, header)
    .then( res => res.json() )
    .then( json => callback(json) )
    .catch( err => console.log({err, header, site, routeName, callback}));
}