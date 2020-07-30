const createOrUpdate = (e) => {
  const state = KEYBOARD_STATE;
  const name = getId('name').children[1].value;
  const id = [...getId('category_id').children[1]].filter( x=> x.selected )[0].id.split('-')[1];
  const type = state.id === '' ? 'POST' : 'PATCH';
  const routeName = state.id === '' ? 'settings' : `settings/${id}`
  const body = {};

  if(name === ''){
    alert('please add a name');
  } else {
    for(const key in state){
      if(typeof state[key] !== 'function'){
        body[key] = state[key];
      }
    }
    body.category_id = parseInt(id);
    request({routeName, type}, JSON.stringify(body))
      .then( res => {
        // I don't like the solution, but don't have time to undo...
        const container = getId('category-select');
        container.innerHTML = '';
        addCategories()
          .then( res => state.update(res))
          .catch( err => console.log(err));
      })
      .catch( err => console.log(err));
  }

};
const deleteFromServer = (e) => {
  const id = parseInt(getId('id').children[1].value);
  // could extract this...
  request({routeName: `settings/${id}`, type: 'DELETE'})
    .then( res => {
      const container = getId('category-select');
      container.innerHTML = '';
      addCategories()
        .then( res => {
          KEYBOARD_STATE.clear();
          KEYBOARD_STATE.update({});
        })
        .catch( err => console.log(err));
    })
    .catch( err => console.log(err));
}

const buttons = () => {
  const container = getId('bottom-bar');
  const save = document.createElement('button');
  const state = KEYBOARD_STATE;

  container.innerHTML = '';
  save.id = 'save';
  save.innerHTML = 'save';
  save.addEventListener('click', createOrUpdate);

  if(state.id === '' && state.category_id === ''){
    container.appendChild(save);
  } else {
    const remove = document.createElement('button');
    const news = document.createElement('button');

    news.id = 'new';
    news.innerHTML = 'new';
    news.addEventListener('click', state.clear.bind(state));
    remove.id = 'delete';
    remove.innerHTML = 'delete';
    remove.addEventListener('click', deleteFromServer);

    container.appendChild(save);
    container.appendChild(remove);
    container.appendChild(news);
  }
}